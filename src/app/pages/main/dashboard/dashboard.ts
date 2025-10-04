import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Users } from "../users/users";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChart } from "./charts/pie-chart/pie-chart";
import { BarVerticalChart } from "./charts/bar-vertical-chart/bar-vertical-chart";
import { MediumBox } from "./medium-box/medium-box";
import { CustomerSummary } from "./table/customer-summary/customer-summary";
import { MainVerticalBarChart } from "./charts/main-vertical-bar-chart/main-vertical-bar-chart";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    Users, 
    NgxChartsModule, 
    PieChart, 
    BarVerticalChart, 
    MediumBox, 
    CustomerSummary, 
    MainVerticalBarChart,
    NgIf
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  collapsed = false; 

  toggleCard() {
    this.collapsed = !this.collapsed;
  }

}
 