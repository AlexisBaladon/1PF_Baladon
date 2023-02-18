import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
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
	@Input() public chartData!: { label: string, datasetLabels: string[], datasets: (number | string)[] };
	@Input() public enrollmentSectionData!: SectionHeaderData;
	@Input() public enrollmentData!: { pictureUrl: string, title: string, description: string }[];
	@Input() public enrollmentSeeMoreAction!: (id: Filterable['id']) => void;
	@Input() public doughnutSectionData!: SectionHeaderData;
	@Input() public doughnutData!: { datasetLabels: string[], datasets: (number | string)[] };
	@Input() public maxEnrollmentsShown = 4;

	public lineChartOptions = { responsive: true };
	public lineChartLegend = true;
	public lineChartType = 'line';
	public doughnutChartLabels: string[] = [];
	public doughnutChartDataset: number[] = [];
	public doughnutChartData!: ChartData<'doughnut'>;
	public doughnutChartType: ChartType = 'doughnut';
	public doughnutChartOptions = { responsive: true };

}
