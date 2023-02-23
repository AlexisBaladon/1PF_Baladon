import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/components/global/confirm-modal/confirm-modal.component';
import { AddCourseFormComponent } from 'src/app/components/layout/add-course-form-component/add-course-form-component/add-course-form.component';
import { DASHBOARD_TEXT } from 'src/app/constants/text';
import { Course } from 'src/app/interfaces/course';
import { Filterable } from 'src/app/logic/filter/filterable';
import { CoursesService } from 'src/app/services/filterables/concrete-data/courses/courses.service';
import { FilterableDataService } from 'src/app/services/filterables/data/filterableData.service';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.scss']
})
export class CourseDashboardComponent {
  constructor(private routes: Router, private coursesService: CoursesService) {}

  public getDashboardText() {
    return DASHBOARD_TEXT['Course']
  }

  public onView(id: string) {
    this.routes.navigate(['layout','course', id]);
  }
  
  public openEditDialog(dialog: MatDialog, mode: 'create' | 'edit', filterable?: Filterable, width?: string | undefined): MatDialogRef<any, any> {
      const dialogRef =  dialog.open(AddCourseFormComponent, {
          width: width || '400px',
          data: { 
            data: filterable, 
            valid: true, 
            title: mode === 'create' ? 'Agregar curso' : 'Editar curso',
          }
      });

      return dialogRef;
  }    

  public openDeleteDialog(dialog: MatDialog, filterableId: Course['id'], width?: string | undefined, filterableService?: FilterableDataService<Course>): MatDialogRef<any, any> {
    return dialog.open(ConfirmModalComponent, {
      width: width || '400px',
      data: {
        title: 'Eliminar curso',
        message: '¿Estás seguro de que quieres eliminar este curso? Los datos perdidos no podrán recuperarse.',
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
