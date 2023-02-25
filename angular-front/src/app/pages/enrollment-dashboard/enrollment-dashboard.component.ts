import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/components/global/confirm-modal/confirm-modal.component';
import { FormModalComponent } from 'src/app/components/global/form-modal/form-modal.component';
import { DASHBOARD_TEXT } from 'src/app/constants/text';
import User from 'src/app/interfaces/user';
import { Filterable } from 'src/app/logic/filter/filterable';
import { Enrollment } from 'src/app/models/enrollment';
import { EnrollmentsService } from 'src/app/services/enrollments/enrollments.service';
import { FilterableDataService } from 'src/app/services/filterables/data/filterableData.service';
import { generateId } from 'src/app/utils/idGenerator';

@Component({
  selector: 'app-enrollment-dashboard',
  templateUrl: './enrollment-dashboard.component.html',
  styleUrls: ['./enrollment-dashboard.component.scss']
})
export class EnrollmentDashboardComponent {
  constructor(private router: Router, private enrollmentsService: EnrollmentsService) {}

  public getDashboardText() {
    return DASHBOARD_TEXT['Enrollment'];
  }

  public onViewEmitter(id: string) {
    this.router.navigate([`/layout/enrollments/${id}`]);
  }

  public openEditDialog(dialog: MatDialog, mode: 'create' | 'edit', filterable?: Filterable, width?: string | undefined): MatDialogRef<any, any> {
    let dialogRef!: MatDialogRef<any, any>;
    const convertData: (data: Enrollment) => Enrollment = (data: Enrollment) => (new Enrollment(
      generateId(),
      data.studentId,
      data.courseId,
      data.grade,
      data.enrollmentDate,
      data.finishDate,
      data.enrollerId,
    ))

    const inputs = [
      { name: 'studentId', type: 'text', label: 'ID de alumno', placeholder: 'Id de alumno', validationType: 'number'},
      { name: 'courseId', type: 'text', label: 'ID de curso', placeholder: 'Id de curso', validationType: 'number'},
      { name: 'grade', type: 'number', label: 'Calificación', placeholder: 'Calificación', validationType: 'number'},
      { name: 'enrollmentDate', type: 'date', label: 'Fecha de inscripción', placeholder: 'Fecha de inscripción', validationType: 'simple'},
      { name: 'finishDate', type: 'date', label: 'Fecha de finalización', placeholder: 'Fecha de finalización', validationType: 'simple'},
    ]
    if (mode === 'create') {
      dialogRef = dialog.open(FormModalComponent, {
        data: {
          title: 'Agregar usuario',
          data: filterable,
          inputs,
          convertData,
        },
        width: '500px',
      });
    }
    else {
      dialogRef = dialog.open(FormModalComponent, {
        data: {
          title: 'Editar usuario',
          data: filterable,
          inputs,
          convertData,
        },
        width: '500px',
      });
    }
    return dialogRef;
   }

   public openDeleteDialog(dialog: MatDialog, filterableId: Filterable['id'],  width?: string | undefined, filterableService?: FilterableDataService<User>): MatDialogRef<any, any> {
      return dialog.open(ConfirmModalComponent, {
        width:  width || '400px',
        data: {
          title: 'Eliminar estudiante',
          message: '¿Estás seguro de que quieres eliminar a este estudiante? Los datos perdidos no podrán recuperarse.',
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar',
          onConfirm: () => {
            filterableService?.deleteFilterable(filterableId);
            dialog.closeAll();
          },
          onCancel: () => {
            dialog.closeAll();
          },
        }
      });
    }
}
