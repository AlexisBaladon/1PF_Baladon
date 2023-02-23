import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/interfaces/course';
import Student from 'src/app/interfaces/student';
import { Filterable } from 'src/app/logic/filter/filterable';
import { Enrollment } from 'src/app/models/enrollment';
import { EnrollmentsService } from 'src/app/services/enrollments/enrollments.service';
import { CoursesService } from 'src/app/services/filterables/concrete-data/courses/courses.service';
import { StudentsService } from 'src/app/services/filterables/concrete-data/students/students.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/components/global/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {
	public doughnutData: { datasetLabels: string[], datasets: number[] } = { datasetLabels: [], datasets: [] };

	public id: Course['id'] | null = null;
	public course: Course | null = null;
	private course$!: Subscription;
	private students: Student[] = [];
	private students$!: Subscription;
	private enrollments$!: Subscription;
	private enrollments: Enrollment[] = [];
	private studentsGrades: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	public courseDetails = [];
	public studentsGradeChart: Chart | undefined;
	public courseStudents: Student[] = []
	private courseStudentsId: Student['id'][] = [];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private coursesService: CoursesService, 
		private studentsService: StudentsService,
		private enrollmentService: EnrollmentsService,
		private dialog: MatDialog,	
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
			this.initializeCourseStudents(id);
			this.countStudentsGrades(this.enrollments, this.courseStudentsId);
			this.initializeChart(this.courseStudents);
		});

		this.enrollments$ = this.enrollmentService.getData().subscribe(enrollments => {
			this.courseStudentsId = [];
			this.enrollments = enrollments;
			enrollments.forEach(enrollment => {
				if (enrollment.courseId === this.id) {
					this.courseStudentsId.push(enrollment.studentId);
				}
			});
			this.initializeCourseStudents(id);
			this.countStudentsGrades(enrollments, this.courseStudentsId);
			this.initializeChart(this.courseStudents);
		});

		this.students$ = this.studentsService.getData().subscribe(students => {
			this.students = students;
			this.initializeCourseStudents(id);
			this.countStudentsGrades(this.enrollments, this.courseStudentsId);
			this.initializeChart(this.courseStudents);
		});

	}

	private initializeCourseStudents(id: Course['id']) {
		const courseStudents: Student[] = [];
		const courseStudentsId: Student['id'][] = [];
		this.enrollments.forEach(enrollment => {
			if (enrollment.courseId === id) {
				courseStudentsId.push(enrollment.studentId);
			}
		});
		this.students.forEach(student => {
			if (courseStudentsId.includes(student.id)) {
				courseStudents.push(student);
			}
		});
		this.courseStudents = courseStudents;
		this.courseStudentsId = courseStudentsId;
	}

	public getCardsData(course?: Course): { title: string, icon: string, value: string }[] {
		if (course === undefined) return [];
		return [
            {title: 'Créditos', icon: 'school', value: String(course?.credits)},
            {title: 'Categoría del curso', icon: 'category', value: course?.category},
            {title: 'Nota promedio', icon: 'star', value: String(course?.averageGrade)},
            {title: 'Total de Estudiantes', icon: 'people', value: String(this.courseStudents.length)},
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

	public getChartData(course?: Course): { label: string, datasetLabels: string[], datasets: number[], backgroundColor: string } {
		if (course === undefined) return { label: '', datasetLabels: [], datasets: [], backgroundColor: 'green' };
		return ({label: 'Nota de estudiantes', datasetLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], datasets: this.studentsGrades, backgroundColor: 'rgba(113, 201, 132, 0.8)'});
	}

	public getEnrollmentSectionData(course?: Course): { title: string, icon: string, description: string, deleteAction?: (id: string) => void } {
		if (course === undefined) return { title: '', icon: '', description: '' };
		return ({
			title: 'Estudiantes', 
			icon: 'school', 
			description: 'Estudiantes del curso',
			deleteAction: (id: string) => {
				this.dialog.open(ConfirmModalComponent, {
					data: { 
						title: 'Eliminar inscripción', 
						message: '¿Está seguro que desea eliminar esta inscripción?',
						confirmButtonText: 'Eliminar',
						cancelButtonText: 'Cancelar',
						onConfirm: () => {this.enrollmentService.deleteFilterable(id); this.dialog.closeAll()},
						onCancel: () => {this.dialog.closeAll();},
					},
				});
			}
		});
	}

	public getEnrollmentData(course?: Course): { academicId: Course['id'], enrollmentId: Enrollment['id'], pictureUrl: string, title: string, description: string }[] {
		if (course === undefined) return [];
		return this.courseStudents.map(student => { 
			return ({ 
				academicId: student.id, 
				enrollmentId: this.enrollments.find(enrollment => enrollment.studentId === student.id && enrollment.courseId === this.id)?.id || '',
				pictureUrl: student.pictureUrl, 
				title: `${student.name} (${student.id})`,
				description: student.email
			})
		});
	}

	public getEnrollmentSeeMoreAction(): () => void {
		return () => {
			this.router.navigate([`layout/enrollments`]);
		}
	}

	public getEnrollmentSeeDetailAction(): (id: Filterable['id']) => void {
		return (id: Filterable['id']) => {
			this.router.navigate([`layout/student/${id}`]);
		}
	}

	public getDoughnutSectionData(course?: Course): { title: string, icon: string, description: string } {
		if (course === undefined) return { title: '', icon: '', description: '' };
		return ({title: 'Carreras', icon: 'donut_small', description: 'Distribución de estudiantes por carrera'});
	}

	public getDoughnutData(course?: Course): { datasetLabels: string[], datasets: number[] } {
		if (course === undefined) return { datasetLabels: [], datasets: [] };
		return ({datasetLabels: this.doughnutData.datasetLabels, datasets: this.doughnutData.datasets});
	}

	private initializeChart(courseStudents: Student[]) {
		const SHOWN_COURSES = 3;
		const uniqueCarriers = Array.from(new Set(courseStudents.map(student => student.career)));
		const careerCount = uniqueCarriers.map(label => ({
			career: label,
			count: courseStudents.filter(student => student.career == label).length
		})).sort((a, b) => b.count - a.count)
		const mostFrequentedCareers = careerCount.slice(0, SHOWN_COURSES);
		const othersCount = mostFrequentedCareers.slice(SHOWN_COURSES).reduce((acc, curr) => acc + curr.count, 0);
		this.doughnutData.datasets = mostFrequentedCareers.map(career => career.count);
		this.doughnutData.datasetLabels = mostFrequentedCareers.map(career => career.career);
		this.doughnutData.datasetLabels.push('Otros');
		this.doughnutData.datasets.push(othersCount);
	}

	private countStudentsGrades(enrollments: Enrollment[], courseStudents: Student['id'][]) {
		this.studentsGrades = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		const studentsEnrollments = enrollments.filter(
			enrollment => courseStudents.includes(enrollment.studentId) && enrollment.courseId === this.id
		);
		const studentsGrades = studentsEnrollments.map(enrollment => enrollment.grade);
		const studentGradesPivot = studentsGrades.reduce((acc, curr) => {
			acc.has(curr) ? acc.set(curr, acc.get(curr) + 1) : acc.set(curr, 1);
			return acc;
		}, new Map());
		Array.from(studentGradesPivot.entries()).forEach(([key, value]) => {
			this.studentsGrades[key - 1] = value;
		});
		const chartData = [
			{ data: this.studentsGrades, label: 'Nota de estudiantes', backgroundColor: '#000' },
		];
		return chartData;
	}
}
