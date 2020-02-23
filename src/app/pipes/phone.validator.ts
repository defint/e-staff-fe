import { AbstractControl, ValidatorFn } from "@angular/forms";
import * as libphonenumber from "google-libphonenumber";

export class PhoneValidator {
  static validCountryPhone = (): ValidatorFn => {
    return (phoneControl: AbstractControl): { [key: string]: boolean } => {
      if (phoneControl.value !== "") {
        try {
          const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
          const phoneNumber = "" + phoneControl.value + "";
          phoneUtil.parse(phoneNumber);

          return undefined;
        } catch (e) {
          return {
            invalidCountryPhone: true
          };
        }
      } else {
        return undefined;
      }
    };
  };
}
