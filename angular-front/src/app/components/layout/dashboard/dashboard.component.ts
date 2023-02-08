import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import type { FilterName } from 'src/app/interfaces/filters';
import type { LogicFilterType } from 'src/app/interfaces/logic-filter-type';
import type { Tree } from 'src/app/logic/filter/tree';
import { jsonParser } from 'src/app/utils/jsonParser';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import * as databaseStudents from 'src/assets/data/students.json';
import Student from 'src/app/interfaces/student';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public filters: Tree<LogicFilterType, FilterName> | undefined;

  public onTreeEmitter(tree: Tree<LogicFilterType, FilterName>) {
    this.filters = tree;
  }

  constructor(public dialog: MatDialog) {}

  public students = jsonParser<Student>(databaseStudents)

  public openAddStudentDialog() {
    const dialogRef = this.dialog.open(AddUserFormComponent, {
      width: '600px',
      data: { 
        student: null, valid: true,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.students = [...this.students, result.student];
    });
  }

}
