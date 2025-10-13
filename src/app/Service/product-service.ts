import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInterface } from './../interface/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  private apiUrl1 = 'https://essweb.in/API/GetCommonApiWithParaList';

  productApiResponse: ProductInterface[] = [];

  // Get Product List API (View Action)
  getProducts(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

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

    return this.http.post(this.apiUrl1, body, { headers });
  }

  loadProducts(): void {
    debugger;
    this.getProducts().subscribe({
      next: (res) => {
        debugger;
        console.log('Product API Response:', res);
        // Ensure backend response key matches your data
        this.productApiResponse = res?.ProductList || res?.data || [];
      
      },
      error: (err) => {
        debugger;
        console.error('API Error:', err);
        alert('Failed to fetch product data');
      }
    });
  }

  private apiUrl2 = 'https://essweb.in/API/SetCommonUserData';

  // Save Product (Add/Edit/Delete)
  saveProduct(action: 'Add' | 'Edit' | 'Delete', formData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const rowStatus = action === 'Add' ? 'A' : action === 'Edit' ? 'E' : action === 'Delete' ? 'D' : 'V';

    const body = {
      ReturnType: 'json',
      tblDynamicParaList: JSON.stringify([
        { ColumnName: 'Action', ColumnValue: 'Edit' }
      ]),
      ResultTable2Save: JSON.stringify([
        {
          ...formData,
          Rowstatus: rowStatus
        }
      ]),
      FormTagID: 'licproduct',
      DevicePlateForm: 'MOBILE',
      ConnectionType: 'lic'
    };

    return this.http.post(this.apiUrl2, body, { headers });
  }

}