import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { NgxSelectModule } from "ngx-select-ex";

@Component({
  selector: 'app-import-party',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButton, NgxSelectModule],
  templateUrl: './import-party.html',
  styleUrl: './import-party.css'
})
export class ImportParty {

importForm: FormGroup;
  categories = ['Supplier', 'Customer', 'Distributor'];
  products = ['Product A', 'Product B', 'Product C'];
  worksheets = ['Sheet1', 'Sheet2', 'Sheet3'];

  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.importForm = this.fb.group({
      category: [''],
      product: [''],
      worksheet: ['Sheet1'],
      mode: ['new']
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected File:', this.selectedFile.name);
    }
  }

  onUpload() {
    if (this.selectedFile) {
      console.log('Uploading file:', this.selectedFile.name);
      // TODO: implement API call for upload
    } else {
      alert('Please select a file first.');
    }
  }

  onImport() {
    console.log('Form Data:', this.importForm.value);
    // TODO: implement API call for import
  }

}
