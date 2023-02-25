import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartData, ChartType } from 'chart.js';
import { ConfirmModalComponent } from 'src/app/components/global/confirm-modal/confirm-modal.component';
import { FormModalComponent } from 'src/app/components/global/form-modal/form-modal.component';
import { Filterable } from 'src/app/logic/filter/filterable';
import { Enrollment } from 'src/app/models/enrollment';
import { EnrollmentsService } from 'src/app/services/enrollments/enrollments.service';

interface SectionHeaderData {
	title: string;
	description: string;
	icon?: string;
	pictureUrl?: string;
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
	@Input() public chartData!: { label: string, datasetLabels: string[], datasets: (number | string)[], backgroundColor?: string };
	@Input() public enrollmentSectionData!: SectionHeaderData & {deleteAction?: (id: string) => void};
	@Input() public enrollmentData!: { academicId: string, enrollmentId: Enrollment['id'],  pictureUrl?: string, icon?: string, title: string, description: string }[];
	@Input() public enrollmentSeeMoreAction!: () => void;
	@Input() public enrollmentSeeDetailAction!: (id: Filterable['id']) => void;
	@Input() public filterableId: { studentId: string } | { courseId: string } = { studentId: '' };
	@Input() public doughnutSectionData!: SectionHeaderData;
	@Input() public doughnutData!: { datasetLabels: string[], datasets: (number | string)[] };
	@Input() public maxEnrollmentsShown = 4;
	@Input() public appStyle = 'linear-main';
	@Input() public secondaryAppStyle = 'linear-green';

	public lineChartOptions = { responsive: true };
	public lineChartLegend = true;
	public lineChartType = 'line';
	public doughnutChartLabels: string[] = [];
	public doughnutChartDataset: number[] = [];
	public doughnutChartData!: ChartData<'doughnut'>;
	public doughnutChartType: ChartType = 'doughnut';
	public doughnutChartOptions = { responsive: true };

	constructor(
		private enrollmentsService: EnrollmentsService,
		private dialog: MatDialog,
		
	) { }

	public deleteAction = (id: string) => {
		return () => {this.enrollmentSectionData?.deleteAction?.(id)};
	}

	public seeMoreAction = (id: string) => {
		return () => {this.enrollmentSeeDetailAction(id)};
	}

	public enrollmentAddMoreAction = () => {
		const convertData: (data: Enrollment) => Enrollment = (data: Enrollment) => (new Enrollment(
			'Cargando...',
			data.studentId,
			data.courseId,
			data.grade,
			data.enrollmentDate,
			data.finishDate,
			data.enrollerId,
		  ))

		const inputs = [
			{ name: 'studentId', type: 'text', label: 'ID de alumno', placeholder: 'Id de alumno', validationType: 'number'},
			{ name: 'courseId', type: 'text', label: 'ID de curso', placeholder: 'Id de curso', validationType: 'number'},
			{ name: 'grade', type: 'number', label: 'Calificación', placeholder: 'Calificación', validationType: 'number'},
			{ name: 'enrollmentDate', type: 'date', label: 'Fecha de inscripción', placeholder: 'Fecha de inscripción', validationType: 'simple'},
			{ name: 'finishDate', type: 'date', label: 'Fecha de finalización', placeholder: 'Fecha de finalización', validationType: 'simple'},
		];

		const dialogRef = this.dialog.open(FormModalComponent, {
			data: {
			  title: 'Agregar inscripción',
			  data: this.filterableId,
			  inputs,
			  convertData,
			},
			width: '500px',
		});
		
		dialogRef.afterClosed().subscribe((data: {data: Enrollment}) => {
			if (data?.data) {
				this.enrollmentsService.addData(data.data);
			}
		});
	}
}
