import { Injectable } from '@angular/core';
import Student from 'src/app/interfaces/student';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { FilterableDataService } from '../../data/filterableData.service';
import * as students from 'src/assets/data/students.json';
import { jsonParser, createStudents } from 'src/app/utils/jsonParser';
import { Filterable } from 'src/app/logic/filter/filterable';
import { AddUserFormComponent } from 'src/app/components/layout/add-user-form/add-user-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/components/global/confirm-modal/confirm-modal.component';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService extends FilterableDataService<Student> {

  constructor( filterPipe: FilterPipe ) {
    const parsedStudents: Student[] = jsonParser<Student>(students);
    const filterableData: Student[] = createStudents(parsedStudents);
    super(filterPipe, filterableData);
   }

  public getByEmail(email: Student['email']): Observable<Student> {
    return this.filterableData$.pipe(
      map((students: Student[]) => students.find((student: Student) => student.email === email) as Student),
    );
  }

   
}
