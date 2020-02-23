import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardPageComponent } from "./dashboard/dashboard-page/dashboard-page.component";
import { EmployeeListComponent } from "./employee/employee-list/employee-list.component";
import { EmployeeItemComponent } from "./employee/employee-item/employee-item.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardPageComponent },
  {
    path: "employee",
    children: [
      { path: "", component: EmployeeListComponent },
      { path: "item", component: EmployeeItemComponent }
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
