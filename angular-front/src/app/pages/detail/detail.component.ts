import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/interfaces/course';
import Student from 'src/app/interfaces/student';
import { CoursesService } from 'src/app/services/filterables/concrete-data/courses/courses.service';
import { StudentsService } from 'src/app/services/filterables/concrete-data/students/students.service';
import { Chart, ChartDataset, ChartData, ChartType } from 'chart.js';
import { EnrollmentsService } from 'src/app/services/enrollments/enrollments.service';
import { Enrollment } from 'src/app/models/enrollment';
import { Filterable } from 'src/app/logic/filter/filterable';

interface SectionHeaderData {
	title: string;
	description: string;
	icon: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
	@Input() public cardsData: { title: string, icon: string, value: string }[] = [];
	@Input() public mainSectionData!: SectionHeaderData;
	@Input() public chartSectionData!: SectionHeaderData;
	@Input() public chartData!: { label: string, datasetLabels: string[], datasets: number[] };
	@Input() public enrollmentSectionData!: SectionHeaderData;
	@Input() public enrollmentData!: { pictureUrl: string, title: string, description: string }[];
	@Input() public enrollmentSeeMoreAction!: (id: Filterable['id']) => void;
	@Input() public doughnutSectionData!: SectionHeaderData;
	@Input() public doughnutData!: { label: string, datasetLabels: string[], datasets: number[] };

	@Input() public students!: Student[];
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
		private coursesService: CoursesService, 
		private studentsService: StudentsService,
		private enrollmentService: EnrollmentsService,
	) { }
	
	//<------------------------CHARTS------------------------>
	public lineChartData: ChartDataset[] = [
		{ data: this.studentsGrades, label: 'Nota de estudiantes' },
	];
	public lineChartLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	public lineChartOptions = {
		responsive: true,
	};
	public lineChartLegend = true;
	public lineChartPlugins = [];
	public lineChartType = 'line';

	public doughnutChartLabels: string[] = [];
	public doughnutChartDataset: number[] = [];
	public doughnutChartData!: ChartData<'doughnut'>;
	public doughnutChartType: ChartType = 'doughnut';
	public doughnutChartOptions = { responsive: true };

	private initializeChart() {
		const SHOWN_COURSES = 3;
		const uniqueCarriers = Array.from(new Set(this.courseStudents.map(student => student.career)));
		const careerCount = uniqueCarriers.map(label => ({
			career: label,
			count: this.courseStudents.filter(student => student.career == label).length
		})).sort((a, b) => b.count - a.count)
		const mostFrequentedCareers = careerCount.slice(0, SHOWN_COURSES);
		const othersCount = mostFrequentedCareers.slice(SHOWN_COURSES).reduce((acc, curr) => acc + curr.count, 0);
		this.doughnutChartLabels = mostFrequentedCareers.map(career => career.career);
		this.doughnutChartDataset = mostFrequentedCareers.map(career => career.count);
		this.doughnutChartLabels.push('Otros');
		this.doughnutChartDataset.push(othersCount);
		this.doughnutChartData = {
			labels: this.doughnutChartLabels,
			datasets: [
				{ data: this.doughnutChartDataset },
			]
		};
	}

	//<------------------------END-CHARTS------------------------>

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
		this.lineChartData = [
			{ data: this.studentsGrades, label: 'Nota de estudiantes' },
		];
	}

	private initializeSecondaryServices(id: Course['id']) {
		this.course$ = this.coursesService.getById(id).subscribe(course => {
			this.course = course;
		});

		this.students$ = this.studentsService.getFilteredData().subscribe(students => {
			if (this.course?.studentsId != undefined) {
				this.courseStudents = students.filter(student => this.course?.studentsId?.includes(student.id));
				this.initializeChart();
			}
		});

		this.enrollments$ = this.enrollmentService.getEnrollments().subscribe(enrollments => {
			if (this.course?.studentsId != undefined) {
				this.countStudentsGrades(enrollments);
			}
		});
	}

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

}
