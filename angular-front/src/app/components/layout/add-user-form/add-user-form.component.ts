import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Student from 'src/app/interfaces/student';
import { FormGroup, FormControl } from '@angular/forms';
import { generateId } from 'src/app/utils/idGenerator';
import { getErrorMessages, isValidInput } from 'src/app/utils/formControl';
import { EMAIL_VALIDATIONS, PASSWORD_VALIDATIONS, SIMPLE_VALIDATIONS } from 'src/app/constants/validations';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      student: Student | null;
      valid: boolean;
    }, private dialogRef: MatDialogRef<AddUserFormComponent>
  ) { }

  private defaultStudentData: Student = this.data.student ?? {} as Student;


  public formGroup = new FormGroup({
    name: new FormControl(this.defaultStudentData.name, SIMPLE_VALIDATIONS),
    surname: new FormControl(this.defaultStudentData.surname, SIMPLE_VALIDATIONS),
    email: new FormControl(this.defaultStudentData.email, EMAIL_VALIDATIONS),
    password: new FormControl(this.defaultStudentData.password, PASSWORD_VALIDATIONS),
    birthDate: new FormControl(this.defaultStudentData.birthDate, SIMPLE_VALIDATIONS),
    admissionDate: new FormControl(this.defaultStudentData.admissionDate, SIMPLE_VALIDATIONS),
    phone: new FormControl(this.defaultStudentData.phone, SIMPLE_VALIDATIONS),
    city: new FormControl(this.defaultStudentData.city, SIMPLE_VALIDATIONS),
    career: new FormControl(this.defaultStudentData.career, SIMPLE_VALIDATIONS),
  });

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

    const student: Student = {
      id: this.data.student?.id ?? generateId(),
      name: formValues.name ?? '',
      surname: formValues.surname ?? '',
      email: formValues.email ?? '',
      password: formValues.password ?? '',
      birthDate: formValues.birthDate ?? new Date(),
      admissionDate: formValues.admissionDate ?? new Date(),
      phone: formValues.phone ?? '',
      city: formValues.city ?? '',
      career: formValues.career ?? '',
      averageGrade: this.data.student?.averageGrade ?? null ?? 0,
    };

    this.data.student = student;
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
