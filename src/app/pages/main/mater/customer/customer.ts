import { CustomerList } from './../../../../interface/customer-List';
import { ChangeDetectorRef, Component, inject, signal, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxDatatableModule, ColumnMode } from '@swimlane/ngx-datatable';
import { MatIconModule } from '@angular/material/icon';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ContentHeader } from "../../../../widgets/content-header/content-header";
import { CUSTOMER } from '../../../../mock-data/customer.list.mock';
import { OnInit } from '@angular/core';
import { AppEditCustomer } from "./app-edit-customer/app-edit-customer";
import { Tabs } from "../../reusable/tabs/tabs";
import { NgIf } from '@angular/common';
import { EditCustomerMisc } from "./edit-customer-misc/edit-customer-misc";
import { Main } from "./main/main";
import { Address } from "./address/address";
import { CompanyInfo } from "./company-info/company-info";
import { Amc } from "./amc/amc";
import { EditCustomerMisc2 } from "./edit-customer-misc-2/edit-customer-misc-2";


@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    NgxDatatableModule,
    MatButtonModule,
    MatIconModule,
    ModalModule,
    ContentHeader,
    AppEditCustomer,
    Tabs,
    NgIf,
    EditCustomerMisc,
    Main,
    Address,
    CompanyInfo,
    Amc,
    EditCustomerMisc2
],
  providers:[BsModalService],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer implements OnInit {

  title = 'CUSTOMER';

  customers = signal<CustomerList[]>([]);

  modalRef = signal<BsModalRef | null>(null);

  private modalService = inject(BsModalService);

  ColumnMode = ColumnMode;

  constructor(private cd: ChangeDetectorRef) {}

  // tabs
  //tabs: string[] = ['Main', 'Misc. Infomation'];

  tabs:any = [
    { label: 'Main', icon: 'fa-solid fa-pencil' }, // using FontAwesome
    { label: 'Address', icon: 'fa-solid fa-location-dot' },
    { label: 'Company Info', icon: 'fa-solid fa-building' },
    { label: 'AMC', icon: 'fa-solid fa-hammer' },
    { label: 'Misc. Info', icon: 'fa-solid fa-pen-nib' },
    { label: 'Misc. Info-2', icon: 'fa-solid fa-pen-nib' }
  ];

  activatedTabIndex: number = 0;
  
  tabChange(tabIndex: number){
    this.activatedTabIndex = tabIndex;
    console.log('Activated Tab:', this.activatedTabIndex);
  }

  ngOnInit() {
    console.log('ngoninit customer');
    this.customers.set(CUSTOMER);
  }

  onPageChange(event: any) {
    console.log(event);
  }

  onSortChange(event: any) {
    console.log(event);
  }

  openUserFormModal(template: TemplateRef<void>, User?: CustomerList){
    this.activatedTabIndex = 0; // or whichever is default
    this.modalRef.set(this.modalService.show(template,{ class: 'modal-lg' }));

    // 🔑 ensures Angular immediately updates the view
    setTimeout(() => this.cd.detectChanges(), 0);
  }

  closeUserModal(){
    this.modalRef()?.hide();
  }

}
