import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Student from 'src/app/interfaces/student';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { FilterableDataService } from '../../data/filterableData.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService extends FilterableDataService<Student> {

  constructor( filterPipe: FilterPipe, httpClient: HttpClient) {
    super(filterPipe, [], httpClient, '/api/students');
  }

  public getByEmail(email: Student['email']): Observable<Student> {
    return this.filterableData$.pipe(
      map((students: Student[]) => students.find((student: Student) => student.email === email) as Student),
    );
  }

   
}
