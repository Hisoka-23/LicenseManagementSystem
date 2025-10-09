import { CommonModule, DatePipe } from '@angular/common';
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

  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.datePickerConfig = {
      containerClass: 'theme-blue',
      dateInputFormat: 'dd-MM-yyyy' // ✅ correct BS datepicker format (uppercase)
    };
  }

  /** Initialize form */
  initForm(): void {
    this.form = this.fb.group({
      ProductCode: ['0'],
      ProductName: ['', Validators.required],
      Description: ['', Validators.required],
      ActiveSince: [null, Validators.required],
      Rowstatus: ['A'] 
    });
  }

    // ✅ Submit form for "Add" action only
  onAdd(): void {
    if (this.form.invalid) {
      alert('Please fill all required fields.');
      return;
    }

    const formValue = this.form.value;

    this.productService.saveProduct('Add', formValue).subscribe({
      next: (res) => {
        console.log('✅ Add API Response:', res);
        alert('Product added successfully!');
        this.form.reset();
      },
      error: (err) => {
        console.error('❌ Add API Error:', err);
        alert('Failed to add product.');
      }
    });
  }

}
