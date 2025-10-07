import { ProductInterface } from './../interface/product-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private http = inject(HttpClient);

  productApiResponse: ProductInterface[] = [];

  loadLicProduct(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      ReturnType: 'json',
      tblDynamicParaList: '[{"columnname":"action","columnvalue":"view"}]',
      ReportTag: 'licproduct',
      ResultType: 'formdata',       
      DevicePlateForm: 'Mobile',    
      ConnectionType: 'lic'
    };

    this.http.post("https://essweb.in/API/GetCommonApiWithParaList", body, { headers })
      .subscribe({
        next:(result: any)=>{
          console.log("Product API Response: ", result);
          this.productApiResponse = result.ProductList;
        },
        error:(err)=>{
          console.error("Error: ", err);
          alert("SomeThing went wrong!");
        }
      })
  }

}
