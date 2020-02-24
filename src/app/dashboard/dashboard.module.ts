import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatBadgeModule } from "@angular/material/badge";
import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [CommonModule, MatGridListModule, MatBadgeModule]
})
export class DashboardModule {}
