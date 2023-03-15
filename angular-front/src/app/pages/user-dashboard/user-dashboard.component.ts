import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/components/global/confirm-modal/confirm-modal.component';
import { FormModalComponent } from 'src/app/components/global/form-modal/form-modal.component';
import { DASHBOARD_TEXT } from 'src/app/constants/text';
import User from 'src/app/interfaces/user';
import { Filterable } from 'src/app/logic/filter/filterable';
import { FilterableDataService } from 'src/app/services/filterables/data/filterableData.service';
import { UsersService } from 'src/app/services/filterables/concrete-data/users/users.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
  constructor(private router: Router, private usersService: UsersService) {}

  public getDashboardText() {
    return DASHBOARD_TEXT['User']
  }

  public onViewEmitter(id: string) {
    this.router.navigate([`/layout/users/${id}`]);
  }

  public openEditDialog(dialog: MatDialog, mode: 'create' | 'edit', filterable?: Filterable, width?: string | undefined): MatDialogRef<any, any> {
    let dialogRef!: MatDialogRef<any, any>;
    const convertData: (data: User) => User = (data: User) => (new User(
      data.id ?? 'Cargando...',
      data.email,
      data.name,
      data.surname,
      data.password,
      data.profile,
      data.phone,
      data.direction,
    ))

    const inputs = [
      { name: 'name', type: 'text', label: 'Nombre', placeholder: 'Nombre de usuario', validationType: 'simple'},
      { name: 'surname', type: 'text', label: 'Apellido', placeholder: 'Apellido de usuario', validationType: 'simple'},
      { name: 'email', type: 'email', label: 'Correo electrónico', placeholder: 'Correo electrónico', validationType: 'email'},
      { name: 'password', type: 'password', label: 'Contraseña', placeholder: 'Contraseña', validationType: 'password'},
      { name: 'profile', type: 'select', label: 'Perfil', placeholder: 'Perfil', validationType: 'simple'},
      { name: 'direction', type: 'text', label: 'Dirección', placeholder: 'Dirección', validationType: 'simple'},
      { name: 'phone', type: 'text', label: 'Teléfono', placeholder: 'Teléfono', validationType: 'simple'},
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
