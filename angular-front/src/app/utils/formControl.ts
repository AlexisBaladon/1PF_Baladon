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
    ['category', 'categoría'],
    ['startTime', 'hora de inicio'],
    ['durationMinutes', 'duración en minutos'],
    ['durationHours', 'duración en horas'],
    ['classroom', 'salón'],
]);

const getControlErrorMessages = (control: AbstractControl<any, any>, controlName: string): string[] => {
    const messages = [];
    const name = controlNames.get(controlName) ?? controlName;
    if (control.hasError('required')) messages.push(`El campo "${name}" es obligatorio`);
    if (control.hasError('minlength')) messages.push(`El largo mínimo de "${name}" es ${control.errors?.["minlength"].requiredLength}`);
    if (control.hasError('maxlength')) messages.push(`El largo máximo de "${name}" es ${control.errors?.["maxlength"].requiredLength}`);
    if (control.hasError('pattern')) messages.push(`El formato de "${name}" es inválido`);
    if (control.hasError('min')) messages.push(`El valor mínimo de "${name}" es ${control.errors?.["min"].min}`);
    if (control.hasError('max')) messages.push(`El valor máximo de "${name}" es ${control.errors?.["max"].max}`);

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