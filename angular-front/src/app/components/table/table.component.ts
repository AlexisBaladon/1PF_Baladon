import { Component } from '@angular/core';
import databaseStudents from 'src/app/data/students';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  students = databaseStudents;

  studentsGradeStyle = [
    {style: 'color', styleValue: 'red', min: 0, max: 4},
    {style: 'color', styleValue: 'orange', min: 4, max: 6},
    {style: 'color', styleValue: 'green', min: 6, max: 10},
  ]
}
