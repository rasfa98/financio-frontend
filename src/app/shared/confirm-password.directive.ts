import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Password and confirm password has to match */
export const confirmPassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value
    ? { passwordsDoNotMatch: true }
    : null;
};
