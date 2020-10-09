import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'angular-bootstrap-md';

import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { MaterialModule } from './material/material.module';
import { ToastrModule } from 'ngx-toastr';


import { PaymentMethodSelectorComponent } from './payment-method-selector/payment-method-selector.component';
import { DashboardDatePickerComponent } from './dashboard-date-picker/dashboard-date-picker.component';
import { UserSelectorComponent } from '../reports/shared/user-selector/user-selector.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GroupByPipe } from './pipes/group-by.pipe';
import { NavComponent } from './nav/nav.component';
@NgModule({
  declarations: [
    GroupByPipe,
    NavComponent,
    PaymentMethodSelectorComponent,
    RestaurantComponent,
    SidebarComponent,
    UserSelectorComponent,
    MenuItemComponent,
    DatePickerComponent,
    DashboardDatePickerComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SweetAlert2Module.forRoot(),
    ModalModule.forRoot(),
    PDFExportModule,
    ToastrModule.forRoot()
  ],
  exports: [
    GroupByPipe,
    FormsModule,
    PDFExportModule,
    NavComponent,
    PaymentMethodSelectorComponent,
    RouterModule,
    NgbModule,
    RestaurantComponent,
    SidebarComponent,
    UserSelectorComponent,
    MaterialModule,
    ReactiveFormsModule,
    MenuItemComponent,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ModalModule,
    SweetAlert2Module,
    ToastrModule,
    DatePickerComponent,
    DashboardDatePickerComponent
  ],
  providers: [
  ],
  entryComponents: [
  ]
})
export class SharedModule { }
