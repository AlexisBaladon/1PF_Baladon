import type { FormGroup, AbstractControl } from '@angular/forms';

const getControlErrorMessages = (control: AbstractControl<any, any>, controlName: string): string[] => {
    const messages = [];

    if (control.hasError('required')) messages.push(`El campo ${controlName} es obligatorio`);
    if (control.hasError('minlength')) messages.push(`El largo mínimo de ${controlName} es ${control.errors?.["minlength"].requiredLength}`);
    if (control.hasError('maxlength')) messages.push(`El largo máximo de ${controlName} es ${control.errors?.["maxlength"].requiredLength}`);
    if (control.hasError('pattern')) messages.push(`El formato de ${controlName} es inválido`);

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