import { Component, Input } from '@angular/core';
import type { FilterName } from 'src/app/interfaces/filters';
import type { LogicFilterType } from 'src/app/interfaces/logic-filter-type';
import type { Tree } from 'src/app/logic/filter/tree';
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
  @Input() public students: Student[] = [];
  
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

      const studentIndex = this.students.findIndex(student => student.id === studentId);
      this.students.splice(studentIndex, 1, result.student);
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
          const studentIndex = this.students.findIndex(student => student.id === studentId);
          this.students.splice(studentIndex, 1);
          this.dialog.closeAll()
        },
        onCancel: () => {
          this.dialog.closeAll()
        },
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.students.push(result.student);
    });
  }

}
