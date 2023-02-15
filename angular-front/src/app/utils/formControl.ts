import type { FormGroup, AbstractControl } from '@angular/forms';

const controlNames = new Map<string, string>([
    ['id', 'id'],
    ['name', 'nombre'],
    ['surname', 'apellido'],
    ['email', 'email'],
    ['password', 'contraseña'],
    ['birthDate', 'fecha de nacimiento'],
    ['phone', 'teléfono'],
    ['city', 'ciudad'],
    ['career', 'carrera'],
    ['admissionDate', 'fecha de admisión'],
    ['averageGrade', 'promedio'],
    ['description', 'descripción'],
    ['credits', 'créditos'],
]);

const getControlErrorMessages = (control: AbstractControl<any, any>, controlName: string): string[] => {
    const messages = [];

    if (control.hasError('required')) messages.push(`El campo "${controlNames.get(controlName)}" es obligatorio`);
    if (control.hasError('minlength')) messages.push(`El largo mínimo de "${controlNames.get(controlName)}" es ${control.errors?.["minlength"].requiredLength}`);
    if (control.hasError('maxlength')) messages.push(`El largo máximo de "${controlNames.get(controlName)}" es ${control.errors?.["maxlength"].requiredLength}`);
    if (control.hasError('pattern')) messages.push(`El formato de "${controlNames.get(controlName)}" es inválido`);

    return messages;
  }

export const getErrorMessages = (formGroup: FormGroup): string[] => {
    const messages = [];

    for (const controlName in formGroup.controls) {
        if (formGroup.controls.hasOwnProperty(controlName)) {
            const control = formGroup.get(controlName);
            if (control?.invalid) {
                messages.push(...getControlErrorMessages(control, controlName));
            }
        }
    }

    return messages;
}

export const isValidInput = (formGroup: FormGroup, controlName: string, submitted: boolean): boolean => {
    const control = formGroup.get(controlName);
    return !(submitted && !!control?.errors);
}