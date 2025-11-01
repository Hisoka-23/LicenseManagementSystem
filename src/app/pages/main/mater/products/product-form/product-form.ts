import { ConfigColumn } from './../../../../../interface/config-column';
import { CommonModule, DatePipe } from '@angular/common';
import { OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
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

  form!: FormGroup; // reative (FormGroup) instance for the product form

  //this method product.ts
  @Output() formSubmitted = new EventEmitter<void>(); //an event emitter to notify parent when form is submitted successfully

  //datepicker config
  datePickerConfig!: Partial<BsDatepickerConfig>; //configuration for ngx-bootstrap datepicker

  //datePipe
  private datePipe = inject(DatePipe);//injected via the inject() helper (alternative to custructor DI).

  // loadingIndicator
  loadingIndicator = signal<boolean>(false); //an Angular signal to track loading UI state (signal API used)

  //setLoadingIndiator()
  setLoadingIndicator(value: boolean) { // small helper to set the signal.
    this.loadingIndicator.set(value);
  }

  //isEditMode
  isEditMode = false;//boolean flag to skip duplicate check when editing an existing product.

  //ConfigColumn
  ConfigColumn: ConfigColumn[] = [];//array to holding the configuration describing dynamic controls.

  //comboList
  comboList: { label: string; value: string }[] = [];//list mapped form API to {label, value} pairs used in select controls.

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    public modalRef: BsModalRef
  ) {}
  /**
   * injects FormBuilder, ProductService, MatSnackBar and model reference to use throughout the component.
   * modalRef is public because you call .hide() from inside the component.
   */

  ngOnInit(): void {

    this.initForm();//create an empty form group.

    this.datePickerConfig = { //Datepicker configuration is set (format + theme class)
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

        this.initFormControls();//dynamically add form controls based on configuration. I am using this for add validation into form

      },

      error: (err) => console.error('API', Error),//log any errors during API call

    });
  }

  /* Initialize form */
  initForm(): void {//Initialize an empty form group. Controals / validators will be added dynamically later.
    this.form = this.fb.group({});
  }

  /* Dynamically add controls based on config */
  initFormControls(): void {
    this.ConfigColumn.forEach((col: any) => {//Loops through each ConfigColumn item
      if (col.Column_Status === 'Show') { //Only process columns with Column_Status === 'Show'

        const validators = [];

        let initialValue: any;

        if (col.IsRequired === 'Y') validators.push(Validators.required);//Add required validator if IsRequired is 'Y'
        if (col.Min_Length) validators.push(Validators.minLength(Number(col.Min_Length))); //Add minLength validator if Min_Length is specified
        if (col.Max_Length) validators.push(Validators.maxLength(Number(col.Max_Length))); //Add maxLength validator if Max_Length is specified

        // Add custom duplicate validator for ProductName field
        if (col.Column_Name === 'ProductName') {
          validators.push(this.duplicateProductNameValidator.bind(this));
        }
        
        if (col.ColumnType === 'List') {//For List type columns, initialize with empty array for list we need to initialize with 'null' and for other  input types with empty string
          initialValue = null;
        } else {
          initialValue = '';
        }

        if (!this.form.contains(col.Column_Name)) {//adds the control only if it doesn't already exist
          this.form.addControl(col.Column_Name, this.fb.control(initialValue, validators));
        }

      }
    });
  }
  
  // Custom validator to check for duplicate ProductName
  duplicateProductNameValidator(control: AbstractControl): { [key: string]: any } | null {
    
    //Skips validation when isEditMode is true (so editing existing product won't be blocked by this)
    if (this.isEditMode || !this.productService.productApiResponse) {
      return null;
    }

    //Skips if control is empty (other validators will handle required check)
    const productName = control.value ? (control.value as string).trim().toLowerCase() : '';
  
    if (!productName) {
      return null; 
    }

    //Normalize and input and compares to product names in the existing list(productApiResponse)
    const isDuplicate = this.productService.productApiResponse.some(
      (product) => (product.ProductName as string)?.trim().toLowerCase() === productName
    );

    //Returns validation error object if duplicate found, otherwise null
    return isDuplicate ? { duplicateProductName: true } : null;

  }

  // Submit form for "Add" action 
  onAdd(): void {

    console.log('Submitting button clicked...!!');

    if (this.form.invalid) {//Starts by checking if the form is valid
      
      this.form.markAllAsTouched();//markAllAsTouched() shows error in the UI.

      // Check specifically for client-side duplicate validation error
      if (this.form.get('ProductName')?.hasError('duplicateProductName')) {

        this.snackBar.open('Product Name already exists!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });

        return; // Stop processing and keep the modal open

      }

      // General invalid form error
      this.snackBar.open('Please fill all required fields!', 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });

      return;

    }

    console.log('Form is Valid - proceeding to api call...!!');

    this.setLoadingIndicator(true);//shows loading indicator

    const formValue = this.form.value;//Calls the productService.saveProduct() to submit the form data to the API

    this.productService.saveProduct('Add', formValue).subscribe({

      next: (res: any) => {

        if (res.Code === '0') {//On success
          this.snackBar.open(res.Reason, '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
          this.formSubmitted.emit();
          this.modalRef.hide(); // Close modal only on success
        } else {
          //API fail (Server-side check)
          console.log('Add API Response:', res);
          setTimeout(() => {//delay to ensure snackbar displays correctly
            this.snackBar.open(res.Reason, 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['snackbar-success'],
            });
          }, 400);

          this.form.reset();//reset the form
          this.productService.loadProducts(); //reload the product list
          this.formSubmitted.emit();//notify parent component

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

  // Handle checkbox changes for multi-select lists
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
