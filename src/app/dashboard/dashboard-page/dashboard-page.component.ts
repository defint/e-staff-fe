import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../services/employee.service";
import { IStat } from "../../interfaces/stat";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.css"]
})
export class DashboardPageComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}

  stat: IStat;

  ngOnInit() {
    this.getStat();
  }

  getStat(): void {
    this.employeeService.getStat().subscribe(stat => {
      this.stat = stat;
      this.stat.tags = this.stat.tags.filter(tag => tag.total > 0);
    });
  }
}
