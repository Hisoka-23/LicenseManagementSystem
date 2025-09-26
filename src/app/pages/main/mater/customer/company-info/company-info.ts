import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-company-info',
  standalone: true,
  imports: [MatButton, MatIcon],
  templateUrl: './company-info.html',
  styleUrl: './company-info.css'
})
export class CompanyInfo {

}
