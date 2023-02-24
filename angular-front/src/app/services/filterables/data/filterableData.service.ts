import { BehaviorSubject, catchError, filter, map, Observable, of, switchMap, tap } from 'rxjs';
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
	constructor(
		protected filterPipe: FilterPipe, 
		protected http: HttpClient,
		protected BASE_URL: string,
	) {}

	protected abstract createData(data: F[]): F[];

	public getData(): Observable<F[]> {
		this.filterableData$ = new BehaviorSubject([] as F[]);
		this.http.get<F[]>(this.BASE_URL).subscribe(data => {
			this.filterableData$.next(this.createData(data));
		});
		return this.filterableData$;
	  }

	public addData(filterableData: F): void {
		this.filterableData$.next([...this.filterableData$.value, filterableData]);
		this.http.post(this.BASE_URL, filterableData).subscribe();
	}

	public updateData(filterableData: F): void {
		this.filterableData$.next(this.filterableData$.value.map(
			f => f.id === filterableData.id ? filterableData : f
		));
		this.http.put<null>(`${this.BASE_URL}/${filterableData.id}`, filterableData).subscribe();
	}

	public getById(id: F['id']): Observable<F | F[]> {
		return this.http.get<F>(`${this.BASE_URL}/${id}`).pipe(
			map(data => this.createData([data])[0]),
			catchError(() => of([]))
		);
	}

	public deleteFilterable(id: F['id']): void {
		this.filterableData$.next(this.filterableData$.value.filter(f => f.id !== id));
		this.http.delete(`${this.BASE_URL}/${id}`).subscribe();
	  }

	public setFilters(filters: LogicNode<LogicFilterType, FilterName> | null): void {
		this.filters = filters;
		this.filterableData$.next(this.filterableData$.value.slice());
	}
		
	public getFilteredData(): Observable<F[]> {
		this.http.get<F[]>(this.BASE_URL).subscribe(data => {
			const createdData = this.createData(data);
			this.filterableData$.next(
				this.filterPipe.transform(createdData, this.filters) as F[]
			);
		});
		return this.filterableData$.asObservable()
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
			})
		);
	}

}
