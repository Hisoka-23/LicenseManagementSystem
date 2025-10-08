import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInterface } from './../interface/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = 'https://essweb.in/API/';

  // ✅ Universal API caller
  private callApi(endpoint: string, method: string, body?: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    switch (method.toUpperCase()) {
      case 'GET': return this.http.get(`${this.baseUrl}${endpoint}`, { headers });
      case 'POST': return this.http.post(`${this.baseUrl}${endpoint}`, body, { headers });
      case 'PUT': return this.http.put(`${this.baseUrl}${endpoint}`, body, { headers });
      case 'DELETE': return this.http.delete(`${this.baseUrl}${endpoint}`, { headers });
      default: throw new Error(`Unsupported request method: ${method}`);
    }
  }

  productApiResponse: ProductInterface[] = [];

  // 🔹 View Products
  loadLicProduct() {
    const body = {
      ReturnType: 'json',
      tblDynamicParaList: JSON.stringify([
        { columnname: 'action', columnvalue: 'view' }
      ]),
      ReportTag: 'licproduct',
      ResultType: 'formdata',
      DevicePlateForm: 'Mobile',
      ConnectionType: 'lic'
    };

    this.callApi('GetCommonApiWithParaList', 'POST', body).subscribe({
      next: (result: any) => {
        console.log('Product API Response:', result);
        this.productApiResponse = result.ProductList;
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Something went wrong!');
      }
    });
  }

addProduct(product: any) {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  const body = {
    ReturnType: 'json',
    tblDynamicParaList: JSON.stringify([
      { columnname: 'action', columnvalue: 'add' },
      { columnname: 'ProductCode', columnvalue: product.ProductCode },
      { columnname: 'ProductName', columnvalue: product.ProductName },
      { columnname: 'Description', columnvalue: product.Description },
      { columnname: 'ActiveSince', columnvalue: product.ActiveSince },
      { columnname: 'Rowstatus', columnvalue: product.Rowstatus }
    ]),
    ReportTag: 'licproductadd',  // 👈 try 'licproductadd' or confirm correct one
    ResultType: 'formdata',
    DevicePlateForm: 'Mobile',
    ConnectionType: 'lic'
  };

  console.log('Sending to API:', body);

  return this.http.post("https://essweb.in/API/GetCommonApiWithParaList", body, { headers });
}


  // 🔹 Update Product
  updateProduct(product: any): Observable<any> {
    const dynamicParams = [
      { columnname: 'action', columnvalue: 'update' },
      { columnname: 'ProductCode', columnvalue: product.ProductCode },
      { columnname: 'ProductName', columnvalue: product.ProductName },
      { columnname: 'Description', columnvalue: product.Description },
      { columnname: 'ActiveSince', columnvalue: product.ActiveSince },
      { columnname: 'Rowstatus', columnvalue: product.Rowstatus }
    ];

    const body = {
      ReturnType: 'json',
      tblDynamicParaList: JSON.stringify(dynamicParams),
      ReportTag: 'licproduct',
      ResultType: 'formdata',
      DevicePlateForm: 'Mobile',
      ConnectionType: 'lic'
    };

    return this.callApi('GetCommonApiWithParaList', 'POST', body);
  }

  // 🔹 Delete Product
  deleteProduct(productId: number): Observable<any> {
    const dynamicParams = [
      { columnname: 'action', columnvalue: 'delete' },
      { columnname: 'ProductCode', columnvalue: productId }
    ];

    const body = {
      ReturnType: 'json',
      tblDynamicParaList: JSON.stringify(dynamicParams),
      ReportTag: 'licproduct',
      ResultType: 'formdata',
      DevicePlateForm: 'Mobile',
      ConnectionType: 'lic'
    };

    return this.callApi('GetCommonApiWithParaList', 'POST', body);
  }
}
