import { Validators } from '@angular/forms';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.([^\s@]+){2,4}$/;
export const INPUTS_MAX_LENGTH = 30;
export const PASSWORD_MIN_LENGTH = 6;
export const SIMPLE_INPUTS_MIN_LENGTH = 2;

export const SIMPLE_VALIDATIONS = [
    Validators.required,
    Validators.minLength(SIMPLE_INPUTS_MIN_LENGTH),
    Validators.maxLength(INPUTS_MAX_LENGTH),
]

export const EMAIL_VALIDATIONS = [
    ...SIMPLE_VALIDATIONS,
    Validators.pattern(EMAIL_REGEX),
]

export const PASSWORD_VALIDATIONS = [
    ...SIMPLE_VALIDATIONS,
    Validators.minLength(PASSWORD_MIN_LENGTH),
]
