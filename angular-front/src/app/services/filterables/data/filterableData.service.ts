import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { FilterName } from 'src/app/interfaces/filters';
import { LogicFilterType } from 'src/app/interfaces/logic-filter-type';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { LogicNode } from 'src/app/logic/filter/logicNode';
import { Filterable } from 'src/app/logic/filter/filterable';
import { DASHBOARD_TEXT } from 'src/app/constants/text';
import { HttpClient } from '@angular/common/http';

export abstract class FilterableDataService<F extends Filterable> {
	private filters: LogicNode<LogicFilterType, FilterName> | null = null;
	protected filterableData$: BehaviorSubject<F[]> = new BehaviorSubject(this.filterableData);
	constructor(
		private filterPipe: FilterPipe, 
		private filterableData: F[],
		private http: HttpClient,
		private BASE_URL: string,
	) {}

	public getData(): Observable<F[]> {
		return this.http.get<F[]>(this.BASE_URL).pipe(
			catchError(err => {
				console.error(err);
				return this.filterableData$;
			}),
			map(filterableData => {
				this.filterableData = filterableData;
				this.filterableData$.next(this.filterableData);
				return this.filterableData;
			})
		);
	}

	public addData(filterableData: F): void {
		this.filterableData.push(filterableData);
		this.filterableData$.next(this.filterableData);
		this.http.post(this.BASE_URL, filterableData);
	}

	public updateData(filterableData: F): void {
		this.filterableData = this.filterableData.map(s => {
			if (s.id === filterableData.id) return filterableData;
			return s;
		});
		this.filterableData$.next(this.filterableData);
		this.http.put(this.BASE_URL, filterableData);
	}

	public getById(id: F['id']): Observable<F | F[]> {
		return this.http.get<F>(`${this.BASE_URL}/${id}`).pipe(
			catchError(err => {
				console.error(err);
				return this.filterableData$;
			}
		));
	}

	public deleteFilterable(id: F['id']): void {
		this.filterableData = this.filterableData.filter(f => f.id !== id);
		this.filterableData$.next(this.filterableData);
		this.http.delete(`${this.BASE_URL}/${id}`);
	}

	public setFilters(filters: LogicNode<LogicFilterType, FilterName> | null): void {
		this.filters = filters;
		this.filterableData$.next(this.filterableData.slice());
	}
		
	public getFilteredData(): Observable<Filterable[]> {
		return this.http.get<F[]>(this.BASE_URL).pipe(
			catchError(err => {
				console.error(err);
				return this.filterableData$;
			}),
			map(filterableData => {
				if (!this.filters) return filterableData;
				return this.filterPipe.transform(filterableData, this.filters);
			})
		);
	}

	public getFilterableAttributes(): Observable<{ attribute: string; attributeName: string }[]> {
		return this.http.get<F[]>(this.BASE_URL).pipe(
			map(datas => {
				const data = datas[0];
				if (!data?.getShownAttributes) return [];
				const typeOfStudent = data.constructor.name;
				return data.getShownAttributes().map(attribute => {
					return {
						attribute,
						attributeName: DASHBOARD_TEXT[typeOfStudent].attributeNames[attribute]
					};
				});
			})
		);
	}

}
