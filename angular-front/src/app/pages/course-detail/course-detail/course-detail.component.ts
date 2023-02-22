import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/interfaces/course';
import Student from 'src/app/interfaces/student';
import { Filterable } from 'src/app/logic/filter/filterable';
import { CourseClass } from 'src/app/models/courses';
import { Enrollment } from 'src/app/models/enrollment';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { EnrollmentsService } from 'src/app/services/enrollments/enrollments.service';
import { CoursesService } from 'src/app/services/filterables/concrete-data/courses/courses.service';
import { StudentsService } from 'src/app/services/filterables/concrete-data/students/students.service';
import { FormModalComponent } from 'src/app/components/global/form-modal/form-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/components/global/confirm-modal/confirm-modal.component';
import { generateId } from 'src/app/utils/idGenerator';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {
	public enrollmentData: { id: string, pictureUrl: string, title: string, description: string }[] = [];
	public doughnutData: { datasetLabels: string[], datasets: number[] } = { datasetLabels: [], datasets: [] };

	public id: Course['id'] | null = null;
	private course$!: Subscription;
	private students$!: Subscription;
	private classes!: CourseClass[];
	private classes$!: Subscription;
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
		private classesService: ClassesService,
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
		});

		this.students$ = this.studentsService.getFilteredData().subscribe(students => {
			if (this.course?.studentsId != undefined) {
				this.courseStudents = students.filter(student => this.course?.studentsId?.includes(student.id));
				this.enrollmentData = this.courseStudents.map(student => { 
					return { id: student.id, pictureUrl: student.pictureUrl, title: student.name, description: student.email }
				});
				this.initializeChart();
			}
		});

		this.enrollments$ = this.enrollmentService.getEnrollments().subscribe(enrollments => {
			if (this.course?.studentsId != undefined) {
				this.countStudentsGrades(enrollments);
			}
		});

		this.classes$ = this.classesService.getClasses().subscribe(classes => {
			this.classes = classes;
		});
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

	public getChartData(course?: Course): { label: string, datasetLabels: string[], datasets: number[], backgroundColor: string } {
		if (course === undefined) return { label: '', datasetLabels: [], datasets: [], backgroundColor: 'green' };
		return ({label: 'Nota de estudiantes', datasetLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], datasets: this.studentsGrades, backgroundColor: 'rgba(113, 201, 132, 0.8)'});
	}

	public getClassesSectionData(course?: Course): { title: string, description: string, icon: string, addAction: () => void, editAction: (id: string) => void, deleteAction: (id: string) => void } {
		if (course === undefined) return { title: '', description: '', icon: '', addAction: () => {}, editAction: (id: string) => {}, deleteAction: (id: string) => {} };
		const inputs = [
			{ name: 'startTime', type: 'datetime-local', label: 'Fecha de inicio', placeholder: 'Fecha de inicio', validationType: 'simple'},
			{ name: 'durationHours', type: 'number', label: 'Horas', placeholder: 'Horas', validationType: 'number'},
			{ name: 'durationMinutes', type: 'number', label: 'Minutos', placeholder: 'Minutos', validationType: 'number'},
			{ name: 'classroom', type: 'text', label: 'Salón', placeholder: 'Salón', validationType: 'simple'},
		]
		return ({
			title: 'Horarios', 
			icon: 'calendar_month', 
			description: 'Horarios de cursos',
			addAction: () => {
				this.dialog.open(FormModalComponent, {
					data: {
						title: 'Agregar clase',
						data: { durationHours: 0, durationMinutes: 0, classroom: '', startTime: '' },
						inputs,
					},
					width: '500px',
				}).afterClosed().subscribe((data: {data: CourseClass}) => {
					if (data != undefined) {
						this.classesService.addCourseClass({
							...data.data,
							courseId: course?.id,
							id: generateId(),
						});
					}
				});
			},
			editAction: (id: string) => {
				this.dialog.open(FormModalComponent, {
					data: {
						title: 'Editar clase',
						data: this.classes.find(courseClass => courseClass.id === id),
						inputs,
					},
					width: '500px',
				}).afterClosed().subscribe(result => {
					if (result) {
						this.classesService.addCourseClass(result);
					}
				});
			}, 
			deleteAction: (id: string) => {
				this.dialog.open(ConfirmModalComponent, {
					data: { 
						title: 'Eliminar clase', 
						message: '¿Está seguro que desea eliminar esta clase?',
						confirmButtonText: 'Eliminar',
						cancelButtonText: 'Cancelar',
						onConfirm: () => {this.classesService.removeCourseClass(id); this.dialog.closeAll()},
						onCancel: () => {this.dialog.closeAll();},
					},
				});
			}
		});
	}

	public getClassesData(course?: Course): { id: string, icon: string, title: string, description: string }[] {
		if (course === undefined) return [];
		const classes = this.classes.filter(courseClass => courseClass.courseId === course.id);
		if (classes.length === 0) return [{id: '', icon: 'schedule', title: 'Sin clases', description: 'No hay clases asignadas a este curso'}];
		return classes.map(courseClass => {
			return {
				id: courseClass.id,
				icon: 'schedule', 
				title: `Salón ${courseClass.classroom}`,
				description: `Fecha: ${courseClass.startTime} - Duración: ${courseClass.durationHours}.${courseClass.durationMinutes}hs`,
			}
		})
	}

	public getEnrollmentSectionData(course?: Course): { title: string, icon: string, description: string } {
		if (course === undefined) return { title: '', icon: '', description: '' };
		return ({title: 'Estudiantes', icon: 'school', description: 'Estudiantes del curso'});
	}

	public getEnrollmentData(course?: Course): { id: Course['id'], pictureUrl: string, title: string, description: string }[] {
		if (course === undefined) return [];
		return this.enrollmentData;
	}

	public getEnrollmentSeeMoreAction(): () => void {
		return () => {
			this.router.navigate([`layout/students`]);
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

	private initializeChart() {
		const SHOWN_COURSES = 3;
		const uniqueCarriers = Array.from(new Set(this.courseStudents.map(student => student.career)));
		const careerCount = uniqueCarriers.map(label => ({
			career: label,
			count: this.courseStudents.filter(student => student.career == label).length
		})).sort((a, b) => b.count - a.count)
		const mostFrequentedCareers = careerCount.slice(0, SHOWN_COURSES);
		const othersCount = mostFrequentedCareers.slice(SHOWN_COURSES).reduce((acc, curr) => acc + curr.count, 0);
		this.doughnutData.datasets = mostFrequentedCareers.map(career => career.count);
		this.doughnutData.datasetLabels = mostFrequentedCareers.map(career => career.career);
		this.doughnutData.datasetLabels.push('Otros');
		this.doughnutData.datasets.push(othersCount);
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
			{ data: this.studentsGrades, label: 'Nota de estudiantes', backgroundColor: '#000' },
		];
		return chartData;
	}	
}
