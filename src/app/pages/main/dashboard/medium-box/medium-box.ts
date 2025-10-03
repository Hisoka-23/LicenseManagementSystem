import { Component } from '@angular/core';
import { SmallBox1 } from "./small-box-1/small-box-1";
import { SmallBox2 } from "./small-box-2/small-box-2";
import { SmallBox3 } from "./small-box-3/small-box-3";
import { SmallBox4 } from "./small-box-4/small-box-4";

@Component({
  selector: 'app-medium-box',
  standalone: true,
  imports: [SmallBox1, SmallBox2, SmallBox3, SmallBox4],
  templateUrl: './medium-box.html',
  styleUrl: './medium-box.css'
})
export class MediumBox {

}
