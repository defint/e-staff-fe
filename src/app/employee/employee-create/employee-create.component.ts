import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PhoneValidator } from "../../helpers/phone.validator";
import { IOffice } from "../../interfaces/office";
import { Location } from "@angular/common";
import { OfficeService } from "../../services/office.service";
import { EmployeeService } from "../../services/employee.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { DOBValidator } from "../../helpers/dob.validator";

@Component({
  selector: "app-employee-create",
  templateUrl: "./employee-create.component.html",
  styleUrls: ["./employee-create.component.css"]
})
export class EmployeeCreateComponent implements OnInit {
  constructor(
    private location: Location,
    private officeService: OfficeService,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  offices: IOffice[] = [];

  reactiveForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    officeId: new FormControl(null, [Validators.required]),
    phone: new FormControl("", [
      Validators.required,
      PhoneValidator.validCountryPhone()
    ]),
    dob: new FormControl("", [
      Validators.required,
      DOBValidator.validMin(),
      DOBValidator.validMax()
    ])
  });

  employeeId: string;

  ngOnInit() {
    this.getOfficeList();

    this.employeeId = this.route.snapshot.paramMap.get("id");
    if (this.employeeId) {
      this.getEmployee();
    }
  }

  getEmployee(): void {
    this.employeeService.getEmployee(this.employeeId).subscribe(employee => {
      this.reactiveForm.controls.name.setValue(employee.name);
      this.reactiveForm.controls.officeId.setValue(employee.office.id);
      this.reactiveForm.controls.phone.setValue(`+${employee.phone}`);
      this.reactiveForm.controls.dob.setValue(employee.dob);
    });
  }

  getOfficeList(): void {
    this.officeService.getOfficeList().subscribe(offices => {
      this.offices = offices;
    });
  }

  goBack(): void {
    this.router.navigateByUrl("/employee");
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

    if (this.reactiveForm.controls[name].errors.dobMin) {
      return `Minimal age is 18`;
    }

    if (this.reactiveForm.controls[name].errors.dobMax) {
      return `Maximal age is 70`;
    }

    if (this.reactiveForm.controls[name].errors.invalidCountryPhone) {
      return "Invalid phone, please use: +xxxxxxxxx";
    }

    return "";
  }

  submit() {
    if (this.reactiveForm.valid) {
      this.employeeService
        .createOrUpdateEmployee(this.employeeId, this.reactiveForm.value)
        .subscribe(employee => {
          this.snackBar.open(
            employee.id ? "Employee has been updated" : "Something went wrong",
            null,
            {
              duration: 4000
            }
          );

          if (employee.id) {
            this.router.navigateByUrl(`/employee/${employee.id}`, {
              replaceUrl: true
            });
          }
        });
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
