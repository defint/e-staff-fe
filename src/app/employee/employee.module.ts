import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  EmployeeListDeleteDialogDialogComponent,
  EmployeeListComponent
} from "./employee-list/employee-list.component";
import { RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatChipsModule } from "@angular/material/chips";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { PhonePipe } from "../helpers/phone.pipe";
import { EmployeeListFilterComponent } from "./employee-list/employee-list-filter/employee-list-filter.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmployeeCreateComponent } from "./employee-create/employee-create.component";
import { EmployeeTagComponent } from "./employee-tag/employee-tag.component";
import { AutofocusDirective } from "../helpers/autofocus.derective";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";

@NgModule({
  declarations: [
    EmployeeListComponent,
    PhonePipe,
    EmployeeListFilterComponent,
    EmployeeListDeleteDialogDialogComponent,
    EmployeeCreateComponent,
    EmployeeTagComponent,
    AutofocusDirective
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
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class EmployeeModule {}
