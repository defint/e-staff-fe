import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeeItemComponent } from "./employee-item/employee-item.component";
import { RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatChipsModule } from "@angular/material/chips";
import { PhonePipe } from "../pipes/phone.pipe";

@NgModule({
  declarations: [EmployeeListComponent, EmployeeItemComponent, PhonePipe],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatChipsModule,
    MatSortModule
  ]
})
export class EmployeeModule {}
