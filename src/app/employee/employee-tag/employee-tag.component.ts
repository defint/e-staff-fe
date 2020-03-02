import { Component, Input, OnInit } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { ITag } from "../../interfaces/tag";
import { EmployeeService } from "../../services/employee.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-employee-tag",
  templateUrl: "./employee-tag.component.html",
  styleUrls: ["./employee-tag.component.css"]
})
export class EmployeeTagComponent implements OnInit {
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: ITag[] = [];

  @Input() employeeId: string;

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee(): void {
    this.employeeService.getEmployee(this.employeeId).subscribe(employee => {
      this.tags = employee.tags;
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = (event.value || "").trim();

    if (value) {
      this.employeeService.addTag(this.employeeId, value).subscribe(tag => {
        if (this.tags.some(currentTag => currentTag.id === tag.id)) {
          this.snackBar.open("Tag already added", null, {
            duration: 3000
          });
        } else {
          this.tags.push(tag);
        }
      });
    }

    if (input) {
      input.value = "";
    }
  }

  remove(tag: ITag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.employeeService.deleteTag(this.employeeId, tag.id).subscribe(() => {
        this.tags.splice(index, 1);
      });
    }
  }
}
