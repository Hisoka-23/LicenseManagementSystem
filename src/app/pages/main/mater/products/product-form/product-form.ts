import { ConfigColumn } from './../../../../../interface/config-column';
import { CommonModule, DatePipe } from '@angular/common';
import { OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductService } from '../../../../../Service/product-service';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBar,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BsDatepickerModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSnackBarModule,
    NgSelectModule,
    MatFormFieldModule,
    MatSelectModule,
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
  form!: FormGroup;

  //this method product.ts
  @Output() formSubmitted = new EventEmitter<void>();

  //date
  datePickerConfig!: Partial<BsDatepickerConfig>;

  //inject date Pipi
  private datePipe = inject(DatePipe);

  // loadingIndicator
  loadingIndicator = signal<boolean>(false);
  //normalInputfilde: TemplateRef<NgIfContext<boolean>> | null | undefined;

  // loading but not working
  setLoadingIndicator(value: boolean) {
    this.loadingIndicator.set(value);
  }

  isEditMode = false;

  //ConfigColumn = signal<ConfigColumn[]>([]);

  ConfigColumn: ConfigColumn[] = [];

  comboList: { label: string; value: string }[] = [];

  // get configration() {
  //   return this.productService.productConfigColumnApiResponse;
  // }

  // get comboList1() {
  //   return this.productService.productComboListApiRespose;
  // }

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    public modalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.initForm();

    // this.form = this.fb.group({});

    this.datePickerConfig = {
      containerClass: 'theme-blue',
      dateInputFormat: 'DD-MM-YYYY',
    };

    //Load Product configuration and ComboList
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        this.ConfigColumn = res?.ConfigColumn || [];
        this.comboList = (res?.ComboList || []).map((item: any) => ({
          label: item.DisplayText,
          value: item.DataValue,
        }));

        //this.comboList = res?.ComboList || [];

        this.initFormControls();
      },
      error: (err) => console.error('API', Error),
    });
  }

  /* Initialize form */
  initForm(): void {
    this.form = this.fb.group({});

    // this.form = new FormGroup({});
    // this.ConfigColumn.forEach((col: any) => {
    //   this.form.addControl(col.Column_Name, new FormControl(null)); // important
    // });
  }

  /* Dynamically add controls based on config */
  initFormControls(): void {
    this.ConfigColumn.forEach((col: any) => {
      if (col.Column_Status === 'Show') {
        const validators = [];

        let initialValue: any;

        if (col.IsRequired === 'Y') validators.push(Validators.required);
        if (col.Min_Length) validators.push(Validators.minLength(Number(col.Min_Length)));
        if (col.Max_Length) validators.push(Validators.maxLength(Number(col.Max_Length)));

        if (col.ColumnType === 'List') {
          initialValue = null;
        } else {
          initialValue = '';
        }

        // Only add the control if it doesn't exist already
        if (!this.form.contains(col.Column_Name)) {
          this.form.addControl(col.Column_Name, this.fb.control(initialValue, validators));
        }
      }
    });
  }

  // Submit form for "Add" action only
  onAdd(): void {
    console.log('Submitting button clicked...!!');

    if (this.form.invalid) {
      //Mark all fields as touched so validation errors show
      this.form.markAllAsTouched();

        this.snackBar.open('Please fill all required fields!', 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });

      return;
    }

    console.log('Form is Valid - proceeding to api call...!!');

    this.setLoadingIndicator(true);

    const formValue = this.form.value;

    this.productService.saveProduct('Add', formValue).subscribe({
      next: (res: any) => {
        if (res.Code === '0') {
          this.snackBar.open(res.Reason, '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
          this.formSubmitted.emit();
        } else {
          console.log('Add API Response:', res);
          setTimeout(() => {
            this.snackBar.open(res.Reason, 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['snackbar-success'],
            });
          }, 400);
          this.form.reset();
          this.productService.loadProducts();
          this.formSubmitted.emit();
        }
      },
      error: (err) => {
        console.error('Add API Error:', err);
        this.snackBar.open(err.Reason, '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      },
      complete: () => this.setLoadingIndicator(false),
    });
  }

  onCheckboxChange(event: any, controlName: string) {
    const control = this.form.get(controlName);
    const selectedValues = control?.value || [];

    if (event.target.checked) {
      selectedValues.push(event.target.value);
    } else {
      const index = selectedValues.indexOf(event.target.value);
      if (index > -1) selectedValues.splice(index, 1);
    }

    control?.setValue(selectedValues);
  }
}
