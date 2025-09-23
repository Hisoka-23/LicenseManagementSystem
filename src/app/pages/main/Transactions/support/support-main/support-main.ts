import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSelectModule } from "ngx-select-ex";

@Component({
  selector: 'app-support-main',
  standalone: true,
  imports: [NgxSelectModule, BsDatepickerModule, MatButton, MatIcon],
  templateUrl: './support-main.html',
  styleUrl: './support-main.css'
})
export class SupportMain {

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
