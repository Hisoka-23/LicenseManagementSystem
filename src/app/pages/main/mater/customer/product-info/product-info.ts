import { Component } from '@angular/core';
import { NgxSelectModule } from "ngx-select-ex";

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [NgxSelectModule],
  templateUrl: './product-info.html',
  styleUrl: './product-info.css'
})
export class ProductInfo {

}
