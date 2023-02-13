import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { FilterName } from 'src/app/interfaces/filters';
import { LogicFilterType } from 'src/app/interfaces/logic-filter-type';
import Student from 'src/app/interfaces/student';
import { jsonParser } from 'src/app/utils/jsonParser';
import * as students from 'src/assets/data/students.json';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { LogicNode } from 'src/app/logic/filter/logicNode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	private filters: LogicNode<LogicFilterType, FilterName> | null = null;
    private students: Student[] = jsonParser<Student>(students);
	private students$: BehaviorSubject<Student[]> = new BehaviorSubject(this.students);
	constructor(private filterPipe: FilterPipe) {}

	public getStudents(): Observable<Student[]> {
		return this.students$.asObservable();
	}

	public addStudent(student: Student): void {
		this.students = [...this.students, student];
		this.students$.next(this.students);
	}

	public updateStudent(studentData: Partial<Student>): void {
		this.students = this.students.map(s => {
			if (s.id === studentData.id) return { ...s, ...studentData };
			return s;
		});
		this.students$.next(this.students);
	}

	public deleteStudent(id: Student['id']): void {
		this.students = this.students.filter(s => s.id !== id);
		this.students$.next(this.students);
	}

	public setStudentFilters(filters: LogicNode<LogicFilterType, FilterName> | null): void {
		this.filters = filters;
		this.students$.next(this.students.slice());
	}
		
	public getFilteredStudents(): Observable<Student[]> {
		return this.students$.pipe(
			map(students => this.filterPipe.transform(students, this.filters) as Student[])
		);
	}
}
