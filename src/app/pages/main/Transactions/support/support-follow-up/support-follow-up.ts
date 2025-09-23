import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgxSelectModule } from "ngx-select-ex";

@Component({
  selector: 'app-support-follow-up',
  standalone: true,
  imports: [NgxSelectModule, MatButton, MatIcon],
  templateUrl: './support-follow-up.html',
  styleUrl: './support-follow-up.css'
})
export class SupportFollowUp {

}
