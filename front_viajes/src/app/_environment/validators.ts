import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dniNieValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;  // Don't validate empty value
    }

    const dniPattern = /^\d{8}[A-Z]$/;
    const niePattern = /^[XYZ]\d{7}[A-Z]$/;

    if (dniPattern.test(value)) {
      return validateDni(value) ? null : { dniNieInvalid: true };
    }

    if (niePattern.test(value)) {
      return validateNie(value) ? null : { dniNieInvalid: true };
    }

    return { dniNieInvalid: true };
  };
}

function validateDni(dni: string): boolean {
  const dniLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const number = dni.substr(0, dni.length - 1);
  const letter = dni.substr(dni.length - 1, 1);

  return dniLetters.charAt(parseInt(number, 10) % 23) === letter;
}

function validateNie(nie: string): boolean {
  // Replace initial letter with corresponding number
  const niePrefix = nie.charAt(0);
  let nieNumber = '';

  switch (niePrefix) {
    case 'X':
      nieNumber = '0' + nie.substr(1);
      break;
    case 'Y':
      nieNumber = '1' + nie.substr(1);
      break;
    case 'Z':
      nieNumber = '2' + nie.substr(1);
      break;
    default:
      return false;
  }

  return validateDni(nieNumber);
}