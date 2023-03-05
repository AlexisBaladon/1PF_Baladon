import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { FilterName } from 'src/app/interfaces/filters';
import { LogicFilterType } from 'src/app/interfaces/logic-filter-type';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { LogicNode } from 'src/app/logic/filter/logicNode';
import { Filterable } from 'src/app/logic/filter/filterable';
import { DASHBOARD_TEXT } from 'src/app/constants/text';
import { HttpClient } from '@angular/common/http';

export abstract class FilterableDataService<F extends Filterable> {
	protected filters: LogicNode<LogicFilterType, FilterName> | null = null;
	protected filterableData$: BehaviorSubject<F[]> = new BehaviorSubject([] as F[]);
	private filterableDataCache: F[] = [];
	constructor(
		protected filterPipe: FilterPipe, 
		protected http: HttpClient,
		protected BASE_URL: string,
	) { }

	protected abstract createData(data: F[]): F[];

	public getData(filtered: boolean = false): Observable<F[]> {
		this.http.get<F[]>(this.BASE_URL).pipe(
			tap(() => this.filterableData$.next(this.filterableData$.value.slice())),
			catchError(() => of([]))
		).subscribe(data => {
			const createdData = this.createData(data);
			this.filterableDataCache = createdData;
			if (filtered) {
				this.filterableData$.next(this.filterPipe.transform(createdData, this.filters) as F[]);
			}
			else {
				this.filterableData$.next(createdData);
			}
		});
		return this.filterableData$;
	  }

	public addData(filterableData: F): void {
		this.http.post(this.BASE_URL, filterableData).pipe(
			tap(() => this.filterableData$.next([...this.filterableData$.value, filterableData] as F[])),
			catchError(() => of([]))
		).subscribe(newData => {
			let newFilterableData = this.filterableData$.value.map(f => {
				return f.id === filterableData.id ? newData : f
			}) as F[];
			newFilterableData = this.createData(newFilterableData);
			this.filterableData$.next(newFilterableData);
		});
	}

	public updateData(filterableData: F): void {
		this.http.put<null>(`${this.BASE_URL}/${filterableData.id}`, filterableData).pipe(
			tap(() => this.filterableData$.next(
				this.filterableData$.value.map(f => {
					return f.id === filterableData.id ? filterableData : f
				}) as F[]
			)),
			catchError(() => of([]))
		).subscribe();
	}

	public getById(id: F['id']): Observable<F | F[]> {
		return this.http.get<F>(`${this.BASE_URL}/${id}`).pipe(
			map(data => this.createData([data])[0]),
			catchError(() => of([]))
		);
	}

	public deleteFilterable(id: F['id']): void {
		this.http.delete(`${this.BASE_URL}/${id}`).pipe(
			tap(() => this.filterableData$.next(this.filterableData$.value.filter(f => f.id !== id))),
			catchError(() => of([]))
		).subscribe();
	  }

	public setFilters(filters: LogicNode<LogicFilterType, FilterName> | null): void {
		this.filters = filters;
		this.filterableData$.next(this.filterPipe.transform(this.filterableDataCache, filters) as F[]);
		console.log('setFilters', this.filterableData$.value);
	}

	public getFilterableAttributes(): Observable<{ attribute: string; attributeName: string }[]> {
		return this.http.get<F[]>(this.BASE_URL).pipe(
			map(datas => {
				const data = this.createData(datas)[0];
				if (!data?.getShownAttributes) return [];
				const typeOfStudent = data.constructor.name;
				return data.getShownAttributes().map(attribute => {
					return {
						attribute,
						attributeName: DASHBOARD_TEXT[typeOfStudent]?.attributeNames?.[attribute] || attribute,
					};
				});
			}),
			catchError(() => of([]))
		);
	}

}
