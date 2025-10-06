import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';


interface Product {
  ProductCode: number;
  ProductName: string;
  Description: string;
  ActiveSince: string;
  Rowstatus: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgxDatatableModule, FormsModule, CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit {

  private http = inject(HttpClient);

  apiResponse: Product[] = [];

  //Products: Product[] = [];

  ColumnMode = ColumnMode;

  columnDefs = [
    { header: 'Product Code', prop: 'ProductCode', width: 75, sortable: true },
    { header: 'Product Name', prop: 'ProductName', width: 75, sortable: true },
    { header: 'Description', prop: 'Description', width: 140, sortable: true },
    { header: 'Active Since', prop: 'ActiveSince', width: 85, sortable: true },
    { header: 'Row Status', prop: 'Rowstatus', width: 100, sortable: true }
  ];

  ngOnInit(): void {
    this.loadLicProduct();
  }

  loadLicProduct() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      ReturnType: "json",
      tblDynamicParaList: "[{'columnname':'action','columnvalue':'view'}]",
      ReportTag: "licproduct",
      ResultType: "formdata",
      DevicePlateForm: "Mobile",
      ConnectionType: "lic"
    };

    this.http.post("https://essweb.in/API/GetCommonApiWithParaList", body, { headers })
      .subscribe({
        next: (result: any) => {
          console.log("API Response:", result);
          this.apiResponse = result.ProductList;
        },
        error: (err) => {
          console.error("Error:", err);
          alert("Something went wrong!");
        }
      });
  }

  onPageChange(event: any) {
    console.log(event);
  }

  onSortChange(event: any) {
    console.log(event);
  }

}
