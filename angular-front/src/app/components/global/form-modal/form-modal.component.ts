import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SIMPLE_VALIDATIONS, EMAIL_VALIDATIONS, PASSWORD_VALIDATIONS, NUMBER_VALIDATIONS } from 'src/app/constants/validations';
import { getErrorMessages, isValidInput } from 'src/app/utils/formControl';

const VALIDATIONS = {
  ['simple']: SIMPLE_VALIDATIONS,
  ['email']: EMAIL_VALIDATIONS,
  ['password']: PASSWORD_VALIDATIONS,
  ['number']: NUMBER_VALIDATIONS,
}

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      data: any;
      valid: boolean;
      inputs: {
        name: string, 
        type: string, 
        label: string, 
        placeholder: string
        validationType?: 'simple' | 'email' | 'password' | 'number'
      }[];
      convertData?: (data: any) => any;
    }, private dialogRef: MatDialogRef<FormModalComponent>
  ) { }

  private defaultCourseData: any = this.data.data ?? {};

  public formGroup = new FormGroup(this.data.inputs.reduce((acc, input) => {
    Object.assign(acc, {[input.name]: new FormControl(
      this.defaultCourseData[input.name], 
      VALIDATIONS[input.validationType ?? 'simple']
    )});
    return acc;
  }, {}));

  public submitted = false;

  public onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.data.valid = false;
      return;
    }

    const inputNames = Object.keys(this.formGroup.controls);
    for (const control in inputNames) {
      if (this.formGroup.get(control)?.invalid) {
        this.data.valid = false;
        return;
      }
    };

    const formValues = this.formGroup.value;
    let createdCourse = Object.assign(this.defaultCourseData, formValues);
    if (this.data.convertData) {
      createdCourse = this.data.convertData(createdCourse);
    }
    
    this.data.data = createdCourse;
    this.data.valid = true;
    this.dialogRef.close(this.data);
  }

  public onCancel() {
    this.dialogRef.close();
  }

  public getErrorMessages = (): string[] => {
    return getErrorMessages(this.formGroup);
  }

  public isValidInput = (controlName: string) => {
    return isValidInput(this.formGroup, controlName, this.submitted);
  }
}
