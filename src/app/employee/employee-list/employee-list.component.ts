import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { IEmployee } from "../../interfaces/employee";
import { EmployeeService } from "../../services/employee.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { IEmployeeFilter } from "../../interfaces/employeeFilter";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { getAge } from "../../helpers/dob.validator";

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
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  openDeleteDialog(id: number) {
    const ref = this.dialog.open(EmployeeListDeleteDialogDialogComponent, {});

    ref.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.getEmployeeList();
        this.snackBar.open("Employee has been deleted", null, {
          duration: 4000
        });
      });
    });
  }

  openEdit(id: number) {
    this.router.navigateByUrl(`/employee/${id}`);
  }

  ngOnInit() {
    this.getEmployeeList();
  }

  formatAge(str) {
    return Math.max(0, getAge(str));
  }

  prepareFilterString = (str: string) => str.trim().toLowerCase();

  strIncludes = (str1: string, str2: string) =>
    this.prepareFilterString(str1).includes(this.prepareFilterString(str2))

  getEmployeeList(): void {
    this.employeeService.getEmployeeList().subscribe(employees => {
      this.dataSource = new MatTableDataSource<IEmployee>(employees);

      this.dataSource.filterPredicate = (item: IEmployee, filter) =>
        this.strIncludes(item.name, filter) ||
        this.strIncludes(item.phone, filter) ||
        this.strIncludes(item.dob, filter) ||
        this.strIncludes(item.office.title, filter) ||
        item.tags.some(tag => this.strIncludes(tag.label, filter));

      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item: IEmployee, property) => {
          switch (property) {
            case "office":
              return item.office.title;
            default:
              return item[property];
          }
        };
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
