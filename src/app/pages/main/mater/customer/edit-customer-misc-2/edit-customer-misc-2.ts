import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSelectModule } from "ngx-select-ex";

@Component({
  selector: 'app-edit-customer-misc-2',
  standalone: true,
  imports: [NgxSelectModule, BsDatepickerModule, MatButton, MatIcon, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-customer-misc-2.html',
  styleUrl: './edit-customer-misc-2.css'
})
export class EditCustomerMisc2 {

  deactivationAllowedCtrl = new FormControl('Yes');

  deactivationAllowed = 'Yes';

  datePickerConfig: Partial<BsDatepickerConfig> = Object.assign(
    {},
    {
      containerClass: 'theme-dark-blue',
      /// showWeekNumber: true,
      /// minDate: new Date(2018, 0, 1),
      ///maxDate: new Date(2018, 11, 31)
      dateInputFormat: 'YYYY-MM-DD',
    }
  );

}
