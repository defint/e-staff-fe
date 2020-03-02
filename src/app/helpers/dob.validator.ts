import { AbstractControl, ValidatorFn } from "@angular/forms";

export function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export class DOBValidator {
  static validMin = (): ValidatorFn => {
    return (dobControl: AbstractControl): { [key: string]: boolean } => {
      if (dobControl.value !== "") {
        const age = getAge(dobControl.value);

        if (age < 18) {
          return {
            dobMin: true
          };
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    };
  }

  static validMax = (): ValidatorFn => {
    return (dobControl: AbstractControl): { [key: string]: boolean } => {
      if (dobControl.value !== "") {
        const age = getAge(dobControl.value);

        if (age > 70) {
          return {
            dobMax: true
          };
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    };
  }
}
