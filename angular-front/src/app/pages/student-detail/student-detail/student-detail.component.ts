import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/interfaces/course';
import Student from 'src/app/interfaces/student';
import { Filterable } from 'src/app/logic/filter/filterable';
import { Enrollment } from 'src/app/models/enrollment';
import { FullNamePipe } from 'src/app/pipes/users/full-name/full-name.pipe';
import { EnrollmentsService } from 'src/app/services/enrollments/enrollments.service';
import { CoursesService } from 'src/app/services/filterables/concrete-data/courses/courses.service';
import { StudentsService } from 'src/app/services/filterables/concrete-data/students/students.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent {
  	public cardsData: { title: string, icon: string, value: string }[] = [];
	public mainSectionData: { title: string, icon: string, description: string } = { title: '', icon: '', description: '' };
	public chartSectionData: { title: string, icon: string, description: string } = { title: '', icon: '', description: '' };
	public chartData: { label: string, datasetLabels: string[], datasets: (string | number)[] } = { label: '', datasetLabels: [], datasets: [] };
	public enrollmentSectionData: { title: string, icon: string, description: string } = { title: '', icon: '', description: '' };
	public enrollmentData: { pictureUrl: string, title: string, description: string }[] = [];
	public enrollmentSeeMoreAction: (id: Filterable['id']) => void = (id: Filterable['id']) => {};
	public doughnutSectionData: { title: string, icon: string, description: string } = { title: '', icon: '', description: '' };
	public doughnutData: { datasetLabels: string[], datasets: number[] } = { datasetLabels: [], datasets: [] };

	public id: Student['id'] | null = null;
	private student$!: Subscription;
	private courses$!: Subscription;
	private enrollments$!: Subscription;
	private studentsGrades: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	public student: Student | undefined;
	public courseDetails = [];
	public studentCourses: Course[] = []
	public studentsGradeChart: Chart | undefined;
	private studentEnrollments: Enrollment[] = [];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private coursesService: CoursesService, 
		private studentsService: StudentsService,
		private enrollmentService: EnrollmentsService,
		private fullNamePipe: FullNamePipe,
		private datePipe: DatePipe
	) { }

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		if (this.id != undefined) {
			this.initializeSecondaryServices(this.id);
		}
	}

	ngOnDestroy(): void {
		this.student$.unsubscribe();
		this.courses$.unsubscribe();
		this.enrollments$.unsubscribe();
	}

	private initializeSecondaryServices(id: Student['id']) {
		this.student$ = this.studentsService.getById(id).subscribe(student => {
			this.student = student;
		});
		
		this.enrollments$ = this.enrollmentService.getEnrollments().subscribe(enrollments => {
			if (this.student?.id != undefined) {
				this.studentEnrollments = enrollments.filter(enrollment => enrollment.studentId == this.student?.id);
			}
		});

		this.courses$ = this.coursesService.getData().subscribe(courses => {
			const studentCourses = new Set<Course>();
			if (this.student?.id != undefined) {
				this.studentEnrollments.forEach(enrollment => {
					const course = courses.find(course => course.id == enrollment.courseId);
					if (course != undefined) {
						studentCourses.add(course);
					}
				});
			}
			this.studentCourses = Array.from(studentCourses);
		});
	}

	public getCardsData(student?: Student): { title: string, icon: string, value: string }[] {
		if (student === undefined) return [];
		const studentAdmissionDate = this.datePipe.transform(student?.admissionDate, 'MM/yyyy');
		const obtainedCredits = this.studentCourses.reduce((credits, course) => credits + course.credits, 0);
		return [
            {title: 'Créditos obtenidos', icon: 'military_tech', value: String(obtainedCredits)},
            {title: 'Fecha de ingreso', icon: 'calendar_month', value: String(studentAdmissionDate)},
            {title: 'Nota promedio', icon: 'grade', value: String(student?.averageGrade)},
            {title: 'Cursos actuales', icon: 'play_arrow', value: String(this.studentCourses.length)},
        ]
	}

	public getMainSectionData(student?: Student): { title: string, pictureUrl: string, description: string } {
		if (student === undefined) return { title: '', pictureUrl: '', description: '' };
		const studentName = this.fullNamePipe.transform(student);
		return ({title: studentName, pictureUrl: student.pictureUrl, description: `Realizando la carrera de ${student?.career}`});
	}

	public getChartSectionData(student?: Student): { title: string, icon: string, description: string } {
		if (student === undefined) return { title: '', icon: '', description: '' };
		this.countStudentsGrades(this.studentEnrollments);
		return ({title: 'Estadísticas', icon: 'equalizer', description: 'Estadísticas de inscripciones'});
	}

	public getChartData(student?: Student): { label: string, datasetLabels: string[], datasets: number[] } {
		if (student === undefined) return { label: '', datasetLabels: [], datasets: [] };
		return ({label: 'Notas de estudiante', datasetLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], datasets: this.studentsGrades});
	}

	public getEnrollmentSectionData(student?: Student): { title: string, icon: string, description: string } {
		if (student === undefined) return { title: '', icon: '', description: '' };
		return ({title: 'Cursos', icon: 'web_asset', description: 'Cursos del estudiante'});
	}

	public getEnrollmentData(student?: Student): { id: string, icon: string, title: string, description: string }[] {
		if (student === undefined) return [];
		return this.studentCourses.map(course => {
			return {
				id: course.id,
				icon: course.icon,
				title: course.name,
				description: course.description
			}
		});
	}

	public getEnrollmentSeeMoreAction(): () => void {
		return () => {
			this.router.navigate([`/layout/courses`]);
		}
	}

	public getEnrollmentSeeDetailAction(): (id: Filterable['id']) => void {
		return (id: Filterable['id']) => {
			this.router.navigate([`layout/course/${id}`]);
		}
	}

	public getDoughnutSectionData(student?: Student): { title: string, icon: string, description: string } {
		if (student === undefined) return { title: '', icon: '', description: '' };
		this.initializeChart();
		return ({title: 'Categoría de cursos', icon: 'donut_small', description: 'Distribución de cursos por categoría'});
	}

	public getDoughnutData(student?: Student): { datasetLabels: string[], datasets: number[] } {
		if (student === undefined) return { datasetLabels: [], datasets: [] };
		return ({datasetLabels: this.doughnutData.datasetLabels, datasets: this.doughnutData.datasets});
	}

	private countStudentsGrades(enrollments: Enrollment[]) {
		const studentsGrades = enrollments.map(enrollment => enrollment.grade);
		const studentGradesPivot = studentsGrades.reduce((acc, curr) => {
			acc.has(curr) ? acc.set(curr, acc.get(curr) + 1) : acc.set(curr, 1);
			return acc;
		}, new Map());
		this.studentsGrades = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		Array.from(studentGradesPivot.entries()).forEach(([key, value]) => {
		    this.studentsGrades[key - 1] = value;
		});
		const chartData = [
			{ data: this.studentsGrades, label: 'Distribución de notas' },
		];
		return chartData;
	}	

	private initializeChart() {
		const SHOWN_COURSES = 3;

		const careerCount = this.studentCourses.map(course => ({
			career: course.category,
			count: this.studentCourses.filter(c => c.category == course.category).length
		})).sort((a, b) => b.count - a.count)
		const mostFrequentedCareers = careerCount.slice(0, SHOWN_COURSES);
		const othersCount = mostFrequentedCareers.slice(SHOWN_COURSES).reduce((acc, curr) => acc + curr.count, 0);
		this.doughnutData.datasets = mostFrequentedCareers.map(career => career.count);
		this.doughnutData.datasetLabels = mostFrequentedCareers.map(career => career.career);
		this.doughnutData.datasetLabels.push('Otros');
		this.doughnutData.datasets.push(othersCount);
	}

}
