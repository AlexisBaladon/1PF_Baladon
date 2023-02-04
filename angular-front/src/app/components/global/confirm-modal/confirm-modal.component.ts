import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      message: string;
      confirmButtonText: string;
      cancelButtonText: string;
      onConfirm: () => void;
      onCancel: () => void;
    },
    private dialogRef: MatDialogRef<ConfirmModalComponent>
  ) { }

}
