import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { getErrorMessages, isValidInput } from 'src/app/utils/formControl';
import { SIMPLE_VALIDATIONS } from 'src/app/constants/validations';
import { Course } from 'src/app/interfaces/course';
import { generateId } from 'src/app/utils/idGenerator';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.scss']
})
export class AddCourseFormComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      student: Partial<Course> | null;
      valid: boolean;
    }, private dialogRef: MatDialogRef<AddCourseFormComponent>
  ) { }

  private defaultCourseData: Partial<Course> = this.data.student ?? {};

  public formGroup = new FormGroup({
    name: new FormControl(this.defaultCourseData.name, SIMPLE_VALIDATIONS),
    description: new FormControl(this.defaultCourseData.description, SIMPLE_VALIDATIONS),
    credits: new FormControl(this.defaultCourseData.credits, SIMPLE_VALIDATIONS),
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

    const createdCourse = new Course(
      this.data.student?.id ?? generateId(),
      formValues.name ?? this.defaultCourseData.name ?? '',
      formValues.description ?? this.defaultCourseData.description ?? '',
      formValues.credits ?? this.defaultCourseData.credits ?? 0,
      null,
      [],
      null,
    );
    
    this.data.student = createdCourse;
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
