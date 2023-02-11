import { BehaviorSubject, filter, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { FilterName } from 'src/app/interfaces/filters';
import { LogicFilterType } from 'src/app/interfaces/logic-filter-type';
import Student from 'src/app/interfaces/student';
import { Tree } from 'src/app/logic/filter/tree';
import { jsonParser } from 'src/app/utils/jsonParser';
import * as students from 'src/assets/data/students.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private students: Student[] = jsonParser<Student>(students);
	private students$: BehaviorSubject<Student[]> = new BehaviorSubject(this.students);

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
		
	public getFilteredStudents(filters: Tree<LogicFilterType, FilterName>): Observable<Student[]> {
		return this.students$.pipe(
			map(students => students.filter(student => true))//filters.evaluate(student)))
		);
	}
}
