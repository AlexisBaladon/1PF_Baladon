import { Component, Input } from '@angular/core';
import * as databaseStudents from 'src/assets/data/students.json';
import type { FilterName } from 'src/app/interfaces/filters';
import type { LogicFilterType } from 'src/app/interfaces/logic-filter-type';
import type { Tree } from 'src/app/logic/filter/tree';
import { jsonParser } from 'src/app/utils/jsonParser';
import Student from 'src/app/interfaces/student';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../global/confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() public filters: Tree<LogicFilterType, FilterName> | undefined;

  public students = jsonParser<Student>(databaseStudents);
  
  constructor(public dialog: MatDialog) {}

  onEditStudent(studentId: Student['id']) {
    const student = this.students.find(student => student.id === studentId);

    const dialogRef = this.dialog.open(AddUserFormComponent, {
      width: '750px',
      data: { 
        student: student, valid: true,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result.valid) return;
    });
  }

  onDeleteStudent(studentId: Student['id']) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '400px',
      data: {
        title: 'Eliminar estudiante',
        message: '¿Estás seguro de que quieres eliminar a este estudiante? Los datos perdidos no podrán recuperarse.',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        onConfirm: () => {
          this.students = this.students.filter(student => student.id !== studentId);
          this.dialog.closeAll()
        },
        onCancel: () => {
          this.dialog.closeAll()
        },
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
    });
  }

}
