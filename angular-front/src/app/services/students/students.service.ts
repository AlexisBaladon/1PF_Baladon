import { Injectable } from '@angular/core';
import Student from 'src/app/interfaces/student';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { UserService } from '../users/user.service';
import * as students from 'src/assets/data/students.json';
import { jsonParser, studentCreator } from 'src/app/utils/jsonParser';
import { Filterable } from 'src/app/logic/filter/filterable';
import { AddUserFormComponent } from 'src/app/components/layout/add-user-form/add-user-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class StudentsService extends UserService<Student> {

  constructor( filterPipe: FilterPipe ) {
    const parsedStudents: Student[] = jsonParser<Student>(students);
    const filterableData: Student[] = studentCreator(parsedStudents);
    super(filterPipe, filterableData);
   }

   public openEditDialog(dialog: MatDialog, filterable: Partial<Student>, width?: string | undefined): MatDialogRef<AddUserFormComponent, any> {
    return dialog.open(AddUserFormComponent, {
      width: width || '600px',
      data: { student: filterable, valid: true, title: 'Editar usuario' },
    });
   }
}
