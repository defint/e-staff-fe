import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardPageComponent } from "./dashboard/dashboard-page/dashboard-page.component";
import { EmployeeListComponent } from "./employee/employee-list/employee-list.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { EmployeeCreateComponent } from "./employee/employee-create/employee-create.component";

const routes: Routes = [
  { path: "", redirectTo: "/employee", pathMatch: "full" },
  { path: "dashboard", component: DashboardPageComponent },
  {
    path: "employee",
    children: [
      { path: "", component: EmployeeListComponent },
      { path: "create", component: EmployeeCreateComponent },
      { path: ":id", component: EmployeeCreateComponent }
    ]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
