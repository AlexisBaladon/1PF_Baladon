import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, ChartData, ChartDataset, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/interfaces/course';
import Student from 'src/app/interfaces/student';
import { Filterable } from 'src/app/logic/filter/filterable';
import { Enrollment } from 'src/app/models/enrollment';
import { EnrollmentsService } from 'src/app/services/enrollments/enrollments.service';
import { CoursesService } from 'src/app/services/filterables/concrete-data/courses/courses.service';
import { StudentsService } from 'src/app/services/filterables/concrete-data/students/students.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {
	public cardsData: { title: string, icon: string, value: string }[] = [];
	public mainSectionData!: { title: string, icon: string, description: string };
	public chartSectionData!: { title: string, icon: string, description: string };
	public chartData!: { label: string, datasetLabels: string[], datasets: number[] };
	public enrollmentSectionData!: { title: string, icon: string, description: string };
	public enrollmentData!: { pictureUrl: string, title: string, description: string }[];
	public enrollmentSeeMoreAction!: (id: Filterable['id']) => void;
	public doughnutSectionData!: { title: string, icon: string, description: string };
	public doughnutData!: { label: string, datasetLabels: string[], datasets: number[] };

	private id: Course['id'] | null = null;
	private course$!: Subscription;
	private students$!: Subscription;
	private enrollments$!: Subscription;
	private studentsGrades: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	public course: Course | undefined;
	public courseDetails = [];
	public courseStudents: Student[] = []
	public studentsGradeChart: Chart | undefined;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private coursesService: CoursesService, 
		private studentsService: StudentsService,
		private enrollmentService: EnrollmentsService,
	) { }

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		if (this.id != undefined) {
			this.initializeSecondaryServices(this.id);
		}
	}

	ngOnDestroy(): void {
		this.course$.unsubscribe();
		this.students$.unsubscribe();
		this.enrollments$.unsubscribe();
	}

	private initializeSecondaryServices(id: Course['id']) {
		this.course$ = this.coursesService.getById(id).subscribe(course => {
			this.course = course;
			//this.setDetailsData();
		});

		this.students$ = this.studentsService.getFilteredData().subscribe(students => {
			if (this.course?.studentsId != undefined) {
				this.courseStudents = students.filter(student => this.course?.studentsId?.includes(student.id));
				this.enrollmentData = this.courseStudents.map(student => { 
					return { pictureUrl: student.pictureUrl, title: student.name, description: student.email }
				});
				this.initializeChart();
			}
		});

		this.enrollments$ = this.enrollmentService.getEnrollments().subscribe(enrollments => {
			if (this.course?.studentsId != undefined) {
				this.countStudentsGrades(enrollments);
			}
		});
	}

	private setDetailsData(course?: Course): void {
		this.cardsData = this.getCardsData(course);
		this.mainSectionData = this.getMainSectionData(course);
		this.chartSectionData = this.getChartSectionData(course);
		this.chartData = this.getChartData(course);
		this.enrollmentSectionData = this.getEnrollmentSectionData(course);
		this.enrollmentData = this.getEnrollmentData(course);
		this.enrollmentSeeMoreAction = this.getEnrollmentSeeMoreAction();
		this.doughnutSectionData = this.getDoughnutSectionData(course);
		this.doughnutData = this.getDoughnutData(course);
	}

	public getCardsData(course?: Course): { title: string, icon: string, value: string }[] {
		if (course === undefined) return [];
		return [
            {title: 'Créditos', icon: 'school', value: String(course?.credits)},
            {title: 'Profesor del Curso', icon: 'person', value: String(course?.teacher)},
            {title: 'Nota promedio', icon: 'star', value: String(course?.averageGrade)},
            {title: 'Total de Estudiantes', icon: 'people', value: String(course?.studentsId?.length)},
        ]
	}

	public getMainSectionData(course?: Course): { title: string, icon: string, description: string } {
		if (course === undefined) return { title: '', icon: '', description: '' };
		return ({title: course.name, icon: course.icon, description: course.description});
	}

	public getChartSectionData(course?: Course): { title: string, icon: string, description: string } {
		if (course === undefined) return { title: '', icon: '', description: '' };
		return ({title: 'Estadísticas', icon: 'equalizer', description: 'Estadísticas de los estudiantes'});
	}

	//TODO: Datasets should be an array of numbers
	public getChartData(course?: Course): { label: string, datasetLabels: string[], datasets: number[] } {
		if (course === undefined) return { label: '', datasetLabels: [], datasets: [] };
		return ({label: 'Estudiantes', datasetLabels: ['Estudiantes'], datasets: [course.studentsId?.length || 0]});
	}

	public getEnrollmentSectionData(course?: Course): { title: string, icon: string, description: string } {
		if (course === undefined) return { title: '', icon: '', description: '' };
		return ({title: 'Estudiantes', icon: 'school', description: 'Estudiantes del curso'});
	}

	public getEnrollmentData(course?: Course): { pictureUrl: string, title: string, description: string }[] {
		if (course === undefined) return [];
		return this.enrollmentData;
	}

	public getEnrollmentSeeMoreAction(): (id: Filterable['id']) => void {
		return (id: Filterable['id']) => {
			this.router.navigate([`/courses/${id}`]);
		}
	}

	public getDoughnutSectionData(course?: Course): { title: string, icon: string, description: string } {
		if (course === undefined) return { title: '', icon: '', description: '' };
		return ({title: 'Carreras', icon: 'donut_small', description: 'Distribución de estudiantes por carrera'});
	}

	//TODO: Datasets should be an array of numbers
	public getDoughnutData(course?: Course): { label: string, datasetLabels: string[], datasets: number[] } {
		if (course === undefined) return { label: '', datasetLabels: [], datasets: [] };
		return ({label: 'Carreras', datasetLabels: ['Carreras'], datasets: [course.studentsId?.length || 0]});
	}

	private initializeChart() {
		let dataLabels: string[] = []

		const SHOWN_COURSES = 3;
		const uniqueCarriers = Array.from(new Set(this.courseStudents.map(student => student.career)));
		const careerCount = uniqueCarriers.map(label => ({
			career: label,
			count: this.courseStudents.filter(student => student.career == label).length
		})).sort((a, b) => b.count - a.count)
		const mostFrequentedCareers = careerCount.slice(0, SHOWN_COURSES);
		const othersCount = mostFrequentedCareers.slice(SHOWN_COURSES).reduce((acc, curr) => acc + curr.count, 0);
		dataLabels = mostFrequentedCareers.map(career => career.career);
		const doughnutChartDataset = mostFrequentedCareers.map(career => career.count);
		dataLabels.push('Otros');
		doughnutChartDataset.push(othersCount);
		const datasets = {
			labels: dataLabels,
			datasets: [
				{ data: doughnutChartDataset },
			]
		};
		return datasets;
	}

	private countStudentsGrades(enrollments: Enrollment[]) {
		const studentsEnrollments = enrollments.filter(enrollment => this.courseStudents.map(student => student.id).includes(enrollment.studentId));
		const studentsGrades = studentsEnrollments.map(enrollment => enrollment.grade);
		const studentGradesPivot = studentsGrades.reduce((acc, curr) => {
			acc.has(curr) ? acc.set(curr, acc.get(curr) + 1) : acc.set(curr, 1);
			return acc;
		}, new Map());
		this.studentsGrades = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		Array.from(studentGradesPivot.entries()).forEach(([key, value]) => {
			this.studentsGrades[key - 1] = value;
		});
		const chartData = [
			{ data: this.studentsGrades, label: 'Nota de estudiantes' },
		];
		return chartData;
	}	
}
