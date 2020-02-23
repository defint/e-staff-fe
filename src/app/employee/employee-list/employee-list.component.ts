import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { IEmployee } from "../../interfaces/employee";
import { EmployeeService } from "../../services/employee.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { IEmployeeFilter } from "../../interfaces/employeeFilter";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "age",
    "phone",
    "office",
    "tags",
    "actions"
  ];
  dataSource: MatTableDataSource<IEmployee>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) {}

  openDeleteDialog(id: number) {
    const ref = this.dialog.open(EmployeeListDeleteDialogDialogComponent, {});

    ref.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.getEmployeeList();
      });
    });
  }

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

@Component({
  selector: "app-employee-list-delete-dialog",
  templateUrl: "employee-list-delete-dialog.html"
})
export class EmployeeListDeleteDialogDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}
}
