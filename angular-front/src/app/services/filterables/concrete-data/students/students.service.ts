import { Injectable } from '@angular/core';
import Student from 'src/app/interfaces/student';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { FilterableDataService } from '../../data/filterableData.service';
import * as students from 'src/assets/data/students.json';
import { jsonParser, studentCreator } from 'src/app/utils/jsonParser';
import { Filterable } from 'src/app/logic/filter/filterable';
import { AddUserFormComponent } from 'src/app/components/layout/add-user-form/add-user-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/components/global/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root',
})
export class StudentsService extends FilterableDataService<Student> {

  constructor( filterPipe: FilterPipe ) {
    const parsedStudents: Student[] = jsonParser<Student>(students);
    const filterableData: Student[] = studentCreator(parsedStudents);
    super(filterPipe, filterableData);
   }

   public openEditDialog(dialog: MatDialog, mode: 'create' | 'edit', filterable: Partial<Student>, width?: string | undefined): MatDialogRef<AddUserFormComponent, any> {
    return dialog.open(AddUserFormComponent, {
      width: width || '600px',
      data: {
        student: filterable, 
        valid: true, 
        title: mode === 'create' ? 'Agregar usuario' : 'Editar usuario',
      },
    });
   }

   public openDeleteDialog(dialog: MatDialog, filterableId: Filterable['id'], width?: string | undefined): MatDialogRef<any, any> {
    return dialog.open(ConfirmModalComponent, {
       width:  width || '400px',
       data: {
         title: 'Eliminar estudiante',
         message: '¿Estás seguro de que quieres eliminar a este estudiante? Los datos perdidos no podrán recuperarse.',
         confirmButtonText: 'Eliminar',
         cancelButtonText: 'Cancelar',
         onConfirm: () => {
           this.deleteFilterable(filterableId);
           dialog.closeAll();
         },
         onCancel: () => {
           dialog.closeAll();
         },
       }
     });
   }
}
