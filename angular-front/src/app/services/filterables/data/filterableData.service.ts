import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { FilterName } from 'src/app/interfaces/filters';
import { LogicFilterType } from 'src/app/interfaces/logic-filter-type';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { LogicNode } from 'src/app/logic/filter/logicNode';
import { Filterable } from 'src/app/logic/filter/filterable';
import { DASHBOARD_TEXT } from 'src/app/constants/text';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

export abstract class FilterableDataService<F extends Filterable> {
	private filters: LogicNode<LogicFilterType, FilterName> | null = null;
	constructor(private filterPipe: FilterPipe, private filterableData: F[]) {}
	private filterableData$: BehaviorSubject<F[]> = new BehaviorSubject(this.filterableData);

	public getData(): Observable<F[]> {
		return this.filterableData$.asObservable();
	}

	public addData(filterableData: F): void {
		this.filterableData = [...this.filterableData, filterableData];
		this.filterableData$.next(this.filterableData);
	}

	public updateData(filterableData: F): void {
		this.filterableData = this.filterableData.map(s => {
			if (s.id === filterableData.id) return filterableData;
			return s;
		});
		this.filterableData$.next(this.filterableData);
	}

	public getById(id: F['id']): Promise<F> {
		return new Promise(resolve => {
			setTimeout(() => {
				const foundFilterable = this.filterableData.find(s => s.id === id);
				if (foundFilterable) resolve(foundFilterable);
			}, 3000);
		});
	}

	public deleteFilterable(id: F['id']): void {
		this.filterableData = this.filterableData.filter(f => f.id !== id);
		this.filterableData$.next(this.filterableData);
	}

	public setFilters(filters: LogicNode<LogicFilterType, FilterName> | null): void {
		this.filters = filters;
		this.filterableData$.next(this.filterableData.slice());
	}
		
	public getFilteredData(): Observable<F[]> {
		return this.filterableData$.pipe(
			map(filterableData => this.filterPipe.transform(filterableData, this.filters) as F[])
		);
	}

	public getFilterableAttributes(): Observable<{ attribute: string; attributeName: string }[]> {
		return this.filterableData$.pipe(
			map(students => {
				const student = students[0];
				if (!student) return [];
				const typeOfStudent = student.constructor.name;
				return student.getShownAttributes().map(attribute => {
					return {
						attribute,
						attributeName: DASHBOARD_TEXT[typeOfStudent].attributeNames[attribute]
					};
				});
			})
		);
	}

	public abstract openEditDialog(dialog: MatDialog, mode: 'create' | 'edit', filterable: Partial<Filterable>, width?: string): MatDialogRef<any, any>;

	public abstract openDeleteDialog(dialog: MatDialog, filterableId: Filterable['id'], width?: string): MatDialogRef<any, any>;
}
