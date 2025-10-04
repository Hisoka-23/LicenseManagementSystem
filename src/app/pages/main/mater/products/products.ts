import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  http = inject(HttpClient);

  apiResponse: any;

  ngOnInit(): any {
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

}
