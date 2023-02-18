import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/interfaces/course';
import Student from 'src/app/interfaces/student';
import { CoursesService } from 'src/app/services/filterables/concrete-data/courses/courses.service';
import { StudentsService } from 'src/app/services/filterables/concrete-data/students/students.service';
import { Chart, ChartDataset, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {
	private id: Course['id'] | null = null;
	private course$!: Subscription;
	private students$!: Subscription;
	public course: Course | undefined;
	public courseDetails = [];
	public courseStudents: Student[] = []
	public studentsGradeChart: Chart | undefined;
	
	//chartjs
	private studentsGrades = [0, 0, 1, 4, 2, 6, 8, 9, 4, 2, 1];
	lineChartData: ChartDataset[] = [
		{ data: this.studentsGrades, label: 'Nota de estudiantes' },
	];
	lineChartLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	lineChartOptions = {
		responsive: true,
	};
	lineChartLegend = true;
	lineChartPlugins = [];
	lineChartType = 'line';

	public doughnutChartLabels: string[] = [];
	public doughnutChartDataset: number[] = [];
	public doughnutChartData!: ChartData<'doughnut'>;
	public doughnutChartType: ChartType = 'doughnut';
	public doughnutChartOptions = {
		responsive: true,
	};

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

	constructor(private route: ActivatedRoute, private coursesService: CoursesService, private studentsService: StudentsService) { }

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		if (this.id != undefined) {
			this.course$ = this.coursesService.getById(this.id).subscribe(course => {
				this.course = course;
			});
			this.students$ = this.studentsService.getFilteredData().subscribe(students => {
				if (this.course?.studentsId != undefined) {
					this.courseStudents = students.filter(student => this.course?.studentsId?.includes(student.id));
					this.initializeChart();
				}
			}
			);
		}
	}

	ngOnDestroy(): void {
		this.course$.unsubscribe();
		this.students$.unsubscribe();
	}


}
