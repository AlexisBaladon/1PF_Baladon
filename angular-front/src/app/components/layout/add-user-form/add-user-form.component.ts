import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { generateId } from 'src/app/utils/idGenerator';
import { getErrorMessages, isValidInput } from 'src/app/utils/formControl';
import { EMAIL_VALIDATIONS, PASSWORD_VALIDATIONS, SIMPLE_VALIDATIONS } from 'src/app/constants/validations';
import Student from 'src/app/interfaces/student';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      filterableData: Student | null;
      valid: boolean;
    }, private dialogRef: MatDialogRef<AddUserFormComponent>
  ) { }

  private defaultStudentData: Student = this.data.filterableData ?? {} as Student;


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

    const student = new Student(
      this.data.filterableData?.id ?? generateId(),
      formValues.name ?? '',
      formValues.surname ?? '',
      formValues.birthDate ?? new Date(),
      formValues.phone ?? '',
      formValues.city ?? '',
      formValues.email ?? '',
      formValues.password ?? '',
      formValues.admissionDate ?? new Date(),
      this.data.filterableData?.averageGrade ?? null ?? 0,
      formValues.career ?? '',
    );
    
    this.data.filterableData = student;
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
