import { Component } from '@angular/core';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSelectModule } from "ngx-select-ex";

@Component({
  selector: 'app-amc',
  standalone: true,
  imports: [BsDatepickerModule, NgxSelectModule],
  templateUrl: './amc.html',
  styleUrl: './amc.css'
})
export class Amc {

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
