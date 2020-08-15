import { AbstractControl, ValidationErrors } from '@angular/forms';

export class AddGuildValidators {
  static required(control: AbstractControl): ValidationErrors | null {
    return control
  }
}