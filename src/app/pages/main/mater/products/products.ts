import { ProductService } from './../../../../Service/product-service';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, input, OnInit, signal, TemplateRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeader } from '../../../../widgets/content-header/content-header';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductForm } from './product-form/product-form';
import { ProductInterface } from '../../../../interface/product-interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgxDatatableModule,
    ContentHeader,
    MatButtonModule,
    BsDatepickerModule,
    MatIconModule,
    ProductForm,
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    SweetAlert2Module,
  ],
  providers: [
    BsModalService,
    DatePipe,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' },
    },
  ],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products implements OnInit {
  tableSignal = viewChild<DatatableComponent>(DatatableComponent);

  datePickerConfig!: Partial<BsDatepickerConfig>;

  private datePipe = inject(DatePipe);

  temp = signal<ProductInterface[]>([]);

  // Title of the page
  title = 'Product Master';

  // DataType of the product get api
  product = signal<ProductInterface[]>([]);

  // loadingIndicator
  loadingIndicator = signal<boolean>(false);

  // modal
  modalRef = signal<BsModalRef | null>(null);

  // modal
  private modalService = inject(BsModalService);

  //Datatable
  columnMode = ColumnMode;

  //check card for component reusability
  isCard = input<boolean>(false);

  setLoadingIndicator(value: boolean) {
    this.loadingIndicator.set(value);
  }

  // inject the ProductService class in Products.ts.
  constructor(private productService: ProductService, private snackBar: MatSnackBar) {}

  // ngOnInit for get api call on life cycle event
  ngOnInit() {
    this.productService.loadProducts();

    this.datePickerConfig = {
      containerClass: 'theme-blue',
      dateInputFormat: 'DD-MM-YYYY',
    };

    // Wait for products to load (assuming service updates productApiResponse)
    setTimeout(() => {
      this.temp.set(this.productService.productApiResponse);
    }, 500);
  }

  //get for getting api data and use in products.html by keywords(products)
  get products() {
    return this.productService.productApiResponse;
  }

  private backupData: any = {};

  // Enable edit mode for the selected row
  editRow(row: any) {
    this.cancelAllEdits();
    this.backupData = { ...row }; // keep backup before editing
    row.isEditable = true;
  }

  // Save edited row — calls API with action = 'Edit'
  saveRow(row: any) {
    if (!row.ProductCode || !row.ProductName) {
      alert('Please fill all fields!');
      return;
    }

    this.setLoadingIndicator(true);

    this.productService.saveProduct('Edit', row).subscribe({
      next: (response) => {
        if (response.Code === '0') {
          this.snackBar.open(response.Reason, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-warning'],
          });
        } else {
          console.log('Edit response:', response);
          row.isEditable = false;
          this.snackBar.open(response.Reason, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-warning'],
          });
          this.productService.loadProducts(); // refresh data after edit
        }
      },
      error: (err) => {
        console.error('Edit API error:', err);
        this.snackBar.open(err.Reason, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      },
      complete: () => this.setLoadingIndicator(false),
    });
  }

  // Cancel edit and revert back to original data
  cancelEdit(row: any) {
    Object.assign(row, this.backupData);
    row.isEditable = false;
  }

  // Delete row — calls API with action = 'Delete'
  deleteRow(row: any) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.setLoadingIndicator(true);

    this.productService.saveProduct('Delete', row).subscribe({
      next: (response: any) => {
        if (response.code === '0') {
          this.snackBar.open(response.Reason, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
        } else {
          console.log('Delete response:', response);
          this.snackBar.open(response.Reason, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
          this.productService.loadProducts(); // refresh list after delete
        }
      },
      error: (err) => {
        console.error('Delete API error:', err);
        this.snackBar.open(err.Reason, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      complete: () => this.setLoadingIndicator(false),
    });
  }

  // Utility — Cancel all edit states
  cancelAllEdits() {
    this.products.forEach((r: any) => (r.isEditable = false));
  }

  onPageChange(event: any) {
    console.log(event);
  }

  onSortChange(event: any) {
    console.log(event);
  }

  openProductFormModal(template: TemplateRef<void>, Product?: ProductForm) {
    this.modalRef.set(this.modalService.show(template, { class: 'modal-lg' }));
  }

  closeUserModal() {
    this.modalRef()?.hide();
  }

  onFilterChange(event: any) {
    const val = (event.target.value || '').toLowerCase();

    const data = this.temp(); // original data

    if (!data || data.length === 0) {
      console.warn('No data in temp() to filter');
      return;
    }

    const filtered = data.filter((item) => {
      const name = item?.ProductName?.toLowerCase() || '';
      const desc = item?.Description?.toLowerCase() || '';
      return name.includes(val) || desc.includes(val);
    });

    this.productService.productApiResponse = val ? filtered : data;
  }
}
