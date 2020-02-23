import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeeItemComponent } from "./employee-item/employee-item.component";
import { RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";

@NgModule({
  declarations: [EmployeeListComponent, EmployeeItemComponent],
  imports: [CommonModule, RouterModule, MatTableModule]
})
export class EmployeeModule {}
