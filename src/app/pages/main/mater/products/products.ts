import { ProductService } from './../../../../Service/product-service';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, input, OnInit, signal, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeader } from "../../../../widgets/content-header/content-header";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { ProductForm } from "./product-form/product-form";
import { ProductInterface } from '../../../../interface/product-interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgxDatatableModule,   
    ContentHeader, 
    MatButtonModule, 
    MatIconModule, 
    ProductForm,
    CommonModule,
    FormsModule,
  ],
  providers:[BsModalService, DatePipe],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit {

  title = 'Product Master';

  product = signal<ProductInterface[]>([]);

  loadingIndicator = signal<boolean>(false);

  modalRef = signal<BsModalRef | null>(null);

  private modalService = inject(BsModalService);

  columnMode = ColumnMode;

  private backupData: any = {};

  //check card for component reusability
  isCard = input<boolean>(false);

  setLoadingIndicator(value: boolean) {
    this.loadingIndicator.set(value);
  }

  // inject the ProductService class in Products.ts.
  constructor(private productService: ProductService) {}

  // ngOnInit for get api call on life cycle event
  ngOnInit() {
    this.productService.loadProducts();
  }

  //get for getting api data and use in products.html by keywords(products)
  get products() {
    return this.productService.productApiResponse;
  }

  editRow(row: any) {
    this.cancelAllEdits();
    this.backupData = { ...row };
    row.isEditable = true;
  }

  saveRow(row: any) {
    // Example: Validate and Save (call API if needed)
    if (!row.ProductCode || !row.ProductName) {
      alert('Please fill all fields!');
      return;
    }

    // API call simulation
    console.log('Saving row:', row);
    row.isEditable = false;
    alert('Row updated successfully!');
  }

  cancelEdit(row: any) {
    Object.assign(row, this.backupData);
    row.isEditable = false;
  }

  deleteRow(row: any) {
    if (confirm('Are you sure you want to delete this product?')) {
      const index = this.products.findIndex(p => p.ProductCode === row.ProductCode);
      if (index > -1) this.products.splice(index, 1);
      alert('Row deleted!');
    }
  }

  cancelAllEdits() {
    this.products.forEach((r: any) => r.isEditable = false);
  }

  onPageChange(event: any) {
    console.log(event);
  }

  onSortChange(event: any) {
    console.log(event);
  }

  openProductFormModal(template: TemplateRef<void>, Product?: ProductForm){

    this.modalRef.set(this.modalService.show(template, { class: 'modal-lg' }));

  }

  closeUserModal(){
    this.modalRef()?.hide();
  }

}
