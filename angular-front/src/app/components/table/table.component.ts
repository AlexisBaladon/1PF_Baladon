import { Component } from '@angular/core';
import databaseStudents from 'src/app/data/students';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  students = databaseStudents;
}
