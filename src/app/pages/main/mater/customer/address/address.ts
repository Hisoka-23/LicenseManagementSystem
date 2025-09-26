import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [MatButton, MatIcon],
  templateUrl: './address.html',
  styleUrl: './address.css'
})
export class Address {

}
