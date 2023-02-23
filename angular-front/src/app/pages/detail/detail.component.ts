import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { Filterable } from 'src/app/logic/filter/filterable';
import { Enrollment } from 'src/app/models/enrollment';

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

	public deleteAction = (id: string) => {
		return () => {this.enrollmentSectionData?.deleteAction?.(id)};
	}

	public seeMoreAction = (id: string) => {
		return () => {this.enrollmentSeeDetailAction(id)};
	}
}
