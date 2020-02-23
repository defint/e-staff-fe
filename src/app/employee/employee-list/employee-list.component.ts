import { Component, OnInit } from "@angular/core";
import { IEmployee } from "../../interfaces/employee";
import { EmployeeService } from "../../services/employee.service";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ["name", "age", "phone", "office", "tags"];
  dataSource: IEmployee[];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployeeList();
  }

  getEmployeeList(): void {
    this.employeeService
      .getEmployeeList()
      .subscribe(employees => (this.dataSource = employees));
  }
}
