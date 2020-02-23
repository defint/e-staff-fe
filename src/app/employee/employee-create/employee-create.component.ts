import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PhoneValidator } from "../../pipes/phone.validator";
import { IOffice } from "../../interfaces/office";
import { Location } from "@angular/common";

@Component({
  selector: "app-employee-create",
  templateUrl: "./employee-create.component.html",
  styleUrls: ["./employee-create.component.css"]
})
export class EmployeeCreateComponent implements OnInit {
  constructor(private location: Location) {}

  offices: IOffice[] = [{ id: 1, title: "Riga" }];

  reactiveForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    officeId: new FormControl(null, [Validators.required]),
    phone: new FormControl("", [
      Validators.required,
      PhoneValidator.validCountryPhone()
    ]),
    age: new FormControl(30, [
      Validators.required,
      Validators.min(18),
      Validators.max(100)
    ])
  });

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }

  hasError(name) {
    return (
      this.reactiveForm.controls[name].invalid &&
      (this.reactiveForm.controls[name].dirty ||
        this.reactiveForm.controls[name].touched)
    );
  }

  getErrorMessage(name) {
    if (this.reactiveForm.controls[name].errors.required) {
      return "Field is required";
    }

    if (this.reactiveForm.controls[name].errors.min) {
      return `Minimal age is ${
        this.reactiveForm.controls[name].errors.min.min
      }`;
    }

    if (this.reactiveForm.controls[name].errors.max) {
      return `Maximal age is ${
        this.reactiveForm.controls[name].errors.max.max
      }`;
    }

    if (this.reactiveForm.controls[name].errors.invalidCountryPhone) {
      return "Invalid phone, please use: +xxxxxxxxx";
    }

    return "";
  }

  submit() {
    if (this.reactiveForm.valid) {
      console.log("form submitted");
    } else {
      Object.keys(this.reactiveForm.controls).forEach(field => {
        const control = this.reactiveForm.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }
}
