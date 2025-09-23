import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, inject, signal, TemplateRef } from '@angular/core';
import { ContentHeader } from "../../../../widgets/content-header/content-header";
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CustomerListTable } from "../../view/view-customerList/customer-list-table/customer-list-table";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Tabs } from "../../reusable/tabs/tabs";
import { SupportMain } from "./support-main/support-main";
import { SupportProduct } from "./support-product/support-product";
import { SupportFollowUp } from "./support-follow-up/support-follow-up";

@Component({
  selector: 'app-support',
  imports: [
    ContentHeader,
    MatButton,
    MatIcon,
    CustomerListTable,
    Tabs,
    NgIf,
    SupportMain,
    SupportProduct,
    SupportFollowUp
],
  providers:[BsModalService],
  templateUrl: './support.html',
  styleUrl: './support.css'
})
export class Support {

  title = 'Home';

  modalRef = signal<BsModalRef | null>(null);

  private modalService = inject(BsModalService);

  constructor(private cd: ChangeDetectorRef){}

  tabs:any = [
    {label: 'Main', icon: 'fa-solid fa-pencil'},
    {label: 'Products', icon: 'fa-solid fa-pen-nib'},
    {label: 'Follow-Up', icon: 'fa-solid fa-pencil'}
  ];

  activatedTabIndex: number = 0;

  tabChange(tabIndex: number){
    this.activatedTabIndex = tabIndex;
    console.log('Activated Tab:', this.activatedTabIndex);
  }

   openUserFormModal(template: TemplateRef<void>){
    this.activatedTabIndex = 0; // or whichever is default
    this.modalRef.set(this.modalService.show(template,{ class: 'modal-xl' }));

    // 🔑 ensures Angular immediately updates the view
    setTimeout(() => this.cd.detectChanges(), 0);
  }

  closeUserModal(){
    this.modalRef()?.hide();
  }

}
