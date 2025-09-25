import { Component } from '@angular/core';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-device-info',
  standalone: true,
  imports: [BsDatepickerModule],
  templateUrl: './device-info.html',
  styleUrl: './device-info.css'
})
export class DeviceInfo {

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
