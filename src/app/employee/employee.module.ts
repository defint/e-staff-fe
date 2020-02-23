import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeeItemComponent } from "./employee-item/employee-item.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeItemComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class EmployeeModule {}
