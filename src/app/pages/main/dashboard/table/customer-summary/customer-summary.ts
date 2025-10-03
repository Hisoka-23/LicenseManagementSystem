import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ColumnMode, DataTableColumnDirective, DatatableComponent } from "@swimlane/ngx-datatable";

@Component({
  selector: 'app-customer-summary',
  standalone: true,
  imports: [DatatableComponent, DataTableColumnDirective, NgIf],
  templateUrl: './customer-summary.html',
  styleUrl: './customer-summary.css'
})
export class CustomerSummary {

  ColumnMode = ColumnMode;

  // Table rows for ngx-datatable
  products = [
    { product: 'Z-Pay', icon: '💳', lt0: 154, d0_30: 3, d31_60: 3, d61_plus: 41 },
    { product: 'eduSys-School', icon: '🏠', lt0: 12, d0_30: 0, d31_60: 0, d61_plus: 8 },
    { product: 'eduSys-College', icon: '🎓', lt0: 5, d0_30: 0, d31_60: 0, d61_plus: 0 },
    { product: 'Busy', icon: '⏱️', lt0: 4, d0_30: 0, d31_60: 0, d61_plus: 0 },
    { product: 'Tally ERP', icon: '🔢', lt0: 10, d0_30: 0, d31_60: 0, d61_plus: 0 },
    { product: 'Biometric Machine', icon: '🔵', lt0: 11, d0_30: 0, d31_60: 0, d61_plus: 0 },
    { product: 'Z-Pay Portal', icon: '🌐', lt0: 1, d0_30: 0, d31_60: 0, d61_plus: 0 }
  ];

    collapsed = false;

  toggleCard() {
    this.collapsed = !this.collapsed;
  }

}
