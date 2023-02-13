import { Inject, Injectable } from '@angular/core';
import Student from 'src/app/interfaces/student';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { UserService } from '../users/user.service';
import * as students from 'src/assets/data/students.json';
import { jsonParser, studentCreator } from 'src/app/utils/jsonParser';

@Injectable({
  providedIn: 'root',
})
export class StudentsService extends UserService<Student> {

  constructor( filterPipe: FilterPipe ) {
    const parsedStudents: Student[] = jsonParser<Student>(students);
    const filterableData: Student[] = studentCreator(parsedStudents);
    super(filterPipe, filterableData);
   }
}
