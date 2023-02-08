import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Student from 'src/app/interfaces/student';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { generateId } from 'src/app/utils/idGenerator';
import { getErrorMessages, isValidInput } from 'src/app/utils/formControl';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      student: Student | null;
      valid: boolean;
    }, private dialogRef: MatDialogRef<AddUserFormComponent>
  ) { }

  private defaultStudentData: Student = this.data.student ?? {} as Student;

  public formGroup = new FormGroup({
    name: new FormControl(this.defaultStudentData.name, [Validators.required]),
    surname: new FormControl(this.defaultStudentData.surname, [Validators.required]),
    email: new FormControl(this.defaultStudentData.email, [Validators.required, Validators.email]),
    password: new FormControl(this.defaultStudentData.password, [Validators.required]),
    birthDate: new FormControl(this.defaultStudentData.birthDate, [Validators.required]),
    admissionDate: new FormControl(this.defaultStudentData.admissionDate, [Validators.required]),
    phone: new FormControl(this.defaultStudentData.phone, [Validators.required]),
    city: new FormControl(this.defaultStudentData.city, [Validators.required]),
    career: new FormControl(this.defaultStudentData.career, [Validators.required]),
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

    const student: Student = {
      id: this.data.student?.id ?? generateId(),
      name: this.formGroup.get('name')?.value!,
      surname: this.formGroup.get('surname')?.value!,
      email: this.formGroup.get('email')?.value!,
      password: this.formGroup.get('password')?.value!,
      birthDate: this.formGroup.get('birthDate')?.value!,
      admissionDate: this.formGroup.get('admissionDate')?.value!,
      phone: this.formGroup.get('phone')?.value!,
      city: this.formGroup.get('city')?.value!,
      career: this.formGroup.get('career')?.value!,
      averageGrade: this.data.student?.averageGrade ?? null,
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
