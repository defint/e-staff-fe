import { Component, OnInit, ViewChild } from "@angular/core";
import { IEmployee } from "../../interfaces/employee";
import { EmployeeService } from "../../services/employee.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { IEmployeeFilter } from "../../interfaces/employeeFilter";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ["name", "age", "phone", "office", "tags"];
  dataSource: MatTableDataSource<IEmployee>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployeeList();
  }

  getEmployeeList(): void {
    this.employeeService.getEmployeeList().subscribe(employees => {
      this.dataSource = new MatTableDataSource<IEmployee>(employees);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
      }, 0);
    });
  }

  doFilter(value: IEmployeeFilter) {
    this.dataSource.filter = value.general;
  }
}
