import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { IEmployeeFilter } from "../../../interfaces/employeeFilter";

@Component({
  selector: "app-employee-list-filter",
  templateUrl: "./employee-list-filter.component.html",
  styleUrls: ["./employee-list-filter.component.css"]
})
export class EmployeeListFilterComponent implements OnInit {
  @Output() doFilter: EventEmitter<IEmployeeFilter> = new EventEmitter();

  reactiveForm = new FormGroup({
    general: new FormControl("")
  });

  constructor() {
    this.reactiveForm.valueChanges.subscribe(v => {
      this.doFilter.emit(v);
    });
  }

  ngOnInit(): void {}
}
