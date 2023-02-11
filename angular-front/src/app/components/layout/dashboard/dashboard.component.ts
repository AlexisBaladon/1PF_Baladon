import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import type { FilterName } from 'src/app/interfaces/filters';
import type { LogicFilterType } from 'src/app/interfaces/logic-filter-type';
import type { Tree } from 'src/app/logic/filter/tree';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import Student from 'src/app/interfaces/student';
import { UserService } from 'src/app/services/users/user.service';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public dialog: MatDialog, public userService: UserService) {}
  public students: Student[] = [];
  public students$!: Subscription;
  public filters: Tree<LogicFilterType, FilterName> | undefined;

  ngOnInit() {
    this.students$ = this.userService.getStudents().subscribe(students => this.students = students);
  }

  ngOnDestroy() {
    this.students$.unsubscribe();
  }

  public onTreeEmitter(tree: Tree<LogicFilterType, FilterName>) {
    this.filters = tree;
  }

  public onStudentUpdate(student: Partial<Student>) {
    this.students = this.students.map(s => {
      if (s.id === student.id) return { ...s, ...student };
      return s;
    });
  }

  public onStudentDelete(id: Student['id']) {
    this.students = this.students.filter(s => s.id !== id);
  }

  public openAddStudentDialog() {
    const dialogRef = this.dialog.open(AddUserFormComponent, {
      width: '600px',
      data: { 
        student: null, valid: true, title: 'Agregar usuario'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.students = [...this.students, result.student];
    });
  }

}
