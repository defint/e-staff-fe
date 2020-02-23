import { Pipe, PipeTransform } from "@angular/core";
import { parsePhoneNumber } from "libphonenumber-js/min";

@Pipe({
  name: "phone"
})
export class PhonePipe implements PipeTransform {
  transform(phoneValue: number | string): any {
    try {
      const phoneNumber = parsePhoneNumber(phoneValue + "");
      return phoneNumber.formatInternational();
    } catch (error) {
      return phoneValue;
    }
  }
}
