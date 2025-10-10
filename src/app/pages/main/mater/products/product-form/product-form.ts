import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSelectModule } from 'ngx-select-ex';
import { ProductService } from '../../../../../Service/product-service';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BsDatepickerModule,
    NgxSelectModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSnackBarModule
  ],
  providers: [DatePipe,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top',  }
    }
  ],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductForm implements OnInit {
  form!: FormGroup;
  datePickerConfig!: Partial<BsDatepickerConfig>;
  private datePipe = inject(DatePipe);
  // loadingIndicator 
  loadingIndicator = signal<boolean>(false);
  setLoadingIndicator(value: boolean) {
    this.loadingIndicator.set(value);
  }

  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
     public modalRef: BsModalRef        // ✅ inject modal reference
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.datePickerConfig = {
      containerClass: 'theme-blue',
      dateInputFormat: 'DD-MM-YYYY'
    };
  }

  /** Initialize form */
  initForm(): void {
    this.form = this.fb.group({
      ProductCode: ['0'],
      ProductName: ['', Validators.required],
      Description: ['', Validators.required],
      ActiveSince: [null, Validators.required],
    });
  }

  // Submit form for "Add" action only
  onAdd(): void {
    if (this.form.invalid) {
      this.snackBar.open('Please fill all required fields!', 'Close', { duration: 5000 });
      return;
    }

    this.setLoadingIndicator(true);

    const formValue = this.form.value;

    this.productService.saveProduct('Add', formValue).subscribe({
      next: (res) => {
        console.log('Add API Response:', res);
       this.snackBar.open('Product added successfully!', '', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top',  panelClass: ['snackbar-success'] });
        this.form.reset();
        this.productService.loadProducts();
      },
      error: (err) => {
        console.error('Add API Error:', err);
         this.snackBar.open('Failed to add product!', '', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top',  panelClass: ['snackbar-error'] });
      },
      complete: () => this.setLoadingIndicator(false),
    });
  }
  

}
