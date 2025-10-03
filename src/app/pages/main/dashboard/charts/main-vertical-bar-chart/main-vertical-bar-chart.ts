import { Component, signal } from '@angular/core';
import { LegendPosition, BarChartModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-main-vertical-bar-chart',
  standalone: true,
  imports: [BarChartModule],
  templateUrl: './main-vertical-bar-chart.html',
  styleUrl: './main-vertical-bar-chart.css'
})
export class MainVerticalBarChart {

  // Chart data for ngx-charts (bar expects {name, value})
  barChartData = [
    { name: 'Apr', value: 0 },
    { name: 'May', value: 1 },
    { name: 'Jun', value: 0 },
    { name: 'Jul', value: 1 },
    { name: 'Aug', value: 2 },
    { name: 'Sep', value: 1 },
    { name: 'Oct', value: 2 },
    { name: 'Nov', value: 4 },
    { name: 'Dec', value: 1 },
    { name: 'Jan', value: 2 },
    { name: 'Feb', value: 1 },
    { name: 'Mar', value: 0 }
  ];


  // Pie chart data
  pieChartData = [
    { name: 'Z-Pay', value: 6 },
    { name: 'eduSys-School', value: 2 },
    { name: 'Tally ERP', value: 1 },
    { name: 'Others', value: 3 }
  ];

  colorScheme = signal<any>({
    name: 'Sales report',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: []
  });


  get totalTransactions() {
    return this.barChartData.reduce((s, x) => s + x.value, 0);
  }


  constructor() { }

  ngOnInit(): void {
    this.colorScheme.update(scheme => {
      return {
        ...scheme,
        domain: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'],
      };
    });
  }

}

