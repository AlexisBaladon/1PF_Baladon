import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { getErrorMessages, isValidInput } from 'src/app/utils/formControl';
import { SIMPLE_VALIDATIONS } from 'src/app/constants/validations';
import { Course } from 'src/app/interfaces/course';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.scss']
})
export class AddCourseFormComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      data: Course | null;
      valid: boolean;
    }, private dialogRef: MatDialogRef<AddCourseFormComponent>
  ) { }

  private defaultCourseData: Course = this.data.data ?? {} as Course;

  public formGroup = new FormGroup({
    name: new FormControl(this.defaultCourseData.name, SIMPLE_VALIDATIONS),
    description: new FormControl(this.defaultCourseData.description, SIMPLE_VALIDATIONS),
    credits: new FormControl(this.defaultCourseData.credits, SIMPLE_VALIDATIONS),
    category: new FormControl(this.defaultCourseData.category, SIMPLE_VALIDATIONS),
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
      this.data.data?.id ?? 'Cargando...',
      formValues.name ?? this.defaultCourseData.name ?? '',
      formValues.description ?? this.defaultCourseData.description ?? '',
      formValues.credits ?? this.defaultCourseData.credits ?? 0,
      this.defaultCourseData.averageGrade ??
      this.defaultCourseData.averageGrade ?? 0,
      this.defaultCourseData.icon ?? '',
      formValues.category ?? '',
    );
    
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
