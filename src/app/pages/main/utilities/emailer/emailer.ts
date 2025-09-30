import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-emailer',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, QuillEditorComponent],
  templateUrl: './emailer.html',
  styleUrls: ['./emailer.css']
})
export class Emailer {

  emailForm: FormGroup;
  products = ['Product A', 'Product B', 'Product C'];

  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image', 'video']
    ]
  };

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      product: ['All'],
      recipientType: ['selected'],
      status: ['Activated'],
      to: [''],
      messageType: ['Email'],
      subject: [''],
      message: ['']
    });
  }

  onSelectGroup() {
    console.log('Open recipient group modal');
  }

  onFillList() {
    console.log('Fill recipient list');
  }

  onShowList() {
    console.log('Show recipient list');
  }

  onMessageReport() {
    console.log('Open message report');
  }

  onSendEmail() {
    if (this.emailForm.valid) {
      console.log('Form Data:', this.emailForm.value);
      alert('Message Sent!');
    } else {
      alert('Please fill all required fields');
    }
  }
}
