import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSelectModule } from 'ngx-select-ex';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BsDatepickerModule,
    NgxSelectModule,
    MatButtonModule,
    MatIconModule,
],
  providers: [DatePipe],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm {

  formData = signal<FormGroup | null>(null);

  private formBuilder = inject(FormBuilder);

  private datePipe = inject(DatePipe);

  constructor(){

  }

  datePickerConfig: Partial<BsDatepickerConfig> = Object.assign(
    {},
    {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'YYYY-MM-DD',
    }
  );

  dateFormat(date: Date, format: string){
    return this.datePipe.transform(date, format);
  }

}
