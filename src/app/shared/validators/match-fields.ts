import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function matchFields(
  fieldAName: string,
  fieldBName: string,
  message = "Passwords don't match."
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const fieldAControl = formGroup.get(fieldAName);
    const fieldBControl = formGroup.get(fieldBName);

    if (!(fieldAControl && fieldBControl)) return null;

    if (fieldAControl.value === fieldBControl.value) return null;

    fieldBControl.setErrors({
      mismatch: {
        message,
      },
    });
    return null;
  };
}
