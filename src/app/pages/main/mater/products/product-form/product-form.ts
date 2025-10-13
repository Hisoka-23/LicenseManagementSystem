import { CommonModule, DatePipe } from '@angular/common';
import { Input, OnInit, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSelectModule } from 'ngx-select-ex';
import { ProductService } from '../../../../../Service/product-service';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBar,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, EventEmitter, Output } from '@angular/core';

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
    MatSnackBarModule,
  ],
  providers: [
    DatePipe,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'snackbar-success',
      },
    },
  ],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css'],
})
export class ProductForm implements OnInit {
  @Output() formSubmitted = new EventEmitter<void>();
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
    public modalRef: BsModalRef // ✅ inject modal reference
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.datePickerConfig = {
      containerClass: 'theme-blue',
      dateInputFormat: 'DD-MM-YYYY',
    };
  }

  /** Initialize form */
  initForm(): void {
    this.form = this.fb.group({
      ProductCode: ['0'],
      ProductName: ['', Validators.required],
      Description: ['', Validators.required],
    });
  }

  // Submit form for "Add" action only
  onAdd(): void {
    if (this.form.invalid) {
      this.snackBar.open('Please fill all required fields!', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      return;
    }

    this.setLoadingIndicator(true);

    const formValue = this.form.value;

    this.productService.saveProduct('Add', formValue).subscribe({
      next: (res: any) => {
        if (res.Code === '0') {
          this.snackBar.open(res.Reason, '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
          this.formSubmitted.emit();
        } else {
          console.log('Add API Response:', res);
          setTimeout(() => {
            this.snackBar.open(res.Reason, 'Close', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['snackbar-success'],
            });
          }, 600);
          this.form.reset();
          this.productService.loadProducts();
          this.formSubmitted.emit();
        }
      },
      error: (err) => {
        console.error('Add API Error:', err);
        this.snackBar.open(err.Reason, '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      },
      complete: () => this.setLoadingIndicator(false),
    });
  }
}
