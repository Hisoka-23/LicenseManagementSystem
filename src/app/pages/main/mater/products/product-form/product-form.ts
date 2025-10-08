import { DatePipe, CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSelectModule } from 'ngx-select-ex';
import { ProductService } from '../../../../../Service/product-service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BsDatepickerModule,
    NgxSelectModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  providers: [DatePipe],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductForm implements OnInit {
  form!: FormGroup;
  datePickerConfig!: Partial<BsDatepickerConfig>;
  private datePipe = inject(DatePipe);

  // track add / edit mode
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.datePickerConfig = {
      containerClass: 'theme-blue',
      dateInputFormat: 'yyyy-MM-dd' // ngx-bootstrap reads/display format
    };
  }

  // Initialize form fields
  initForm(): void {
    this.form = this.fb.group({
      ProductCode: ['', Validators.required],
      ProductName: ['', Validators.required],
      Description: ['', Validators.required],
      ActiveSince: [null, Validators.required], // store as Date initially
      Rowstatus: ['', Validators.required]
    });
  }

  // call this to prefill form when editing an existing product
  // product.ActiveSince can be a string like "2025-10-08" or a Date
  setEditMode(product: any) {
    this.isEditMode = true;
    const activeDate = product.ActiveSince ? new Date(product.ActiveSince) : null;
    this.form.patchValue({
      ProductCode: product.ProductCode ?? '',
      ProductName: product.ProductName ?? '',
      Description: product.Description ?? '',
      ActiveSince: activeDate,
      Rowstatus: product.Rowstatus ?? ''
    });
  }

  // On form submit
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.warn('Form invalid', this.form.value);
      return;
    }

    const raw = this.form.value;
    const formatted = {
      ...raw,
      ActiveSince: raw.ActiveSince ? this.dateFormat(raw.ActiveSince, 'yyyy-MM-dd') : ''
    };

    console.log('Submitting (isEditMode=', this.isEditMode, '):', formatted);

    if (this.isEditMode) {
      this.updateExistingProduct(formatted);
    } else {
      this.addNewProduct(formatted);
    }
  }

  // Add Product
  addNewProduct(product: any): void {
    this.productService.addProduct(product).subscribe({
      next: (res) => {
        console.log('Added successfully:', res);
        alert('✅ Product Added Successfully!');
        this.form.reset();
        this.isEditMode = false;
      },
      error: (err) => {
        console.error('Error while adding product:', err);
        alert('❌ Error while adding product');
      }
    });
  }

  // Update Product
  updateExistingProduct(product: any): void {
    this.productService.updateProduct(product).subscribe({
      next: (res) => {
        console.log('Updated successfully:', res);
        alert('✅ Product Updated Successfully!');
        this.form.reset();
        this.isEditMode = false;
      },
      error: (err) => {
        console.error('Error while updating product:', err);
        alert('❌ Error while updating product');
      }
    });
  }

  // Date format helper
  dateFormat(date: Date | string, format: string): string | null {
    return this.datePipe.transform(date, format);
  }
}
