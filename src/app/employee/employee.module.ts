import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  EmployeeListDeleteDialogDialogComponent,
  EmployeeListComponent
} from "./employee-list/employee-list.component";
import { EmployeeItemComponent } from "./employee-item/employee-item.component";
import { RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatChipsModule } from "@angular/material/chips";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { PhonePipe } from "../pipes/phone.pipe";
import { EmployeeListFilterComponent } from "./employee-list/employee-list-filter/employee-list-filter.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeItemComponent,
    PhonePipe,
    EmployeeListFilterComponent,
    EmployeeListDeleteDialogDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatChipsModule,
    MatSortModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class EmployeeModule {}
