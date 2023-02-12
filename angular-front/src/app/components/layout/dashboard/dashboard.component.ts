import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import type { FilterName } from 'src/app/interfaces/filters';
import type { LogicFilterType } from 'src/app/interfaces/logic-filter-type';
import type { Tree } from 'src/app/logic/filter/tree';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import Student from 'src/app/interfaces/student';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public filters: Tree<LogicFilterType, FilterName> | undefined;
  constructor(public dialog: MatDialog, public userService: UserService) {}

  public openAddStudentDialog() {
    const dialogRef = this.dialog.open(AddUserFormComponent, {
      width: '600px',
      data: { 
        student: null, valid: true, title: 'Agregar usuario'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      const resultStudent: Student | undefined = result?.student;
      if (!resultStudent) return;
      this.userService.addStudent(resultStudent);
    });
  }

}
