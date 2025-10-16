import { ConfigColumn } from './../../../../../interface/config-column';
import { CommonModule, DatePipe, NgIfContext } from '@angular/common';
import { Input, OnInit, TemplateRef, ViewChild, inject, signal } from '@angular/core';
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
normalInputfilde: TemplateRef<NgIfContext<boolean>> | null | undefined;

  setLoadingIndicator(value: boolean) {
    this.loadingIndicator.set(value);
  }

  isEditMode = false;

  ConfigColumn = signal<ConfigColumn[]>([]);

  get configration() {
    return this.productService.productConfigColumnApiResponse;
  }

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
    this.form = this.fb.group({});
    this.configration.forEach((col) => {
      if (col.Column_Status === 'Show') {
        const validators = [];

        if (col.IsRequired === 'Y') validators.push(Validators.required);
        if (col.Min_Length) validators.push(Validators.minLength(Number(col.Min_Length)));
        if (col.Max_Length) validators.push(Validators.maxLength(Number(col.Max_Length)));

        this.form.addControl(col.Column_Name, this.fb.control('', validators));
      }
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
