import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { FilterName } from 'src/app/interfaces/filters';
import { LogicFilterType } from 'src/app/interfaces/logic-filter-type';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { LogicNode } from 'src/app/logic/filter/logicNode';
import { Filterable } from 'src/app/logic/filter/filterable';

@Injectable({
  providedIn: 'root'
})
export class UserService<F extends Filterable> {
	private filters: LogicNode<LogicFilterType, FilterName> | null = null;
	constructor(private filterPipe: FilterPipe, @Inject('filterableData') private filterableData: F[]) {}
	private filterableData$: BehaviorSubject<F[]> = new BehaviorSubject(this.filterableData);

	public getData(): Observable<F[]> {
		return this.filterableData$.asObservable();
	}

	public addData(filterableData: F): void {
		this.filterableData = [...this.filterableData, filterableData];
		this.filterableData$.next(this.filterableData);
	}

	public updateData(filterableData: Partial<F>): void {
		this.filterableData = this.filterableData.map(s => {
			if (s.id === filterableData.id) return { ...s, ...filterableData };
			return s;
		});
		this.filterableData$.next(this.filterableData);
	}

	public deleteStudent(id: F['id']): void {
		this.filterableData = this.filterableData.filter(f => f.id !== id);
		this.filterableData$.next(this.filterableData);
	}

	public setStudentFilters(filters: LogicNode<LogicFilterType, FilterName> | null): void {
		this.filters = filters;
		this.filterableData$.next(this.filterableData.slice());
	}
		
	public getFilteredStudents(): Observable<F[]> {
		return this.filterableData$.pipe(
			map(students => this.filterPipe.transform(this.filterableData, this.filters) as F[])
		);
	}

	//use typescript to infer F attribute types as returned values
	public getFilterableAttributes(): Observable<string[]> {
		return this.filterableData$.pipe(
			map(students => {
				if (students.length === 0) return [];
				const student = students[0];
				return student.getShownAttributes();
			})
		);
	}

}
