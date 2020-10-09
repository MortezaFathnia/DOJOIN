import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material/material.module';



import { GroupByPipe } from './pipes/group-by.pipe';
@NgModule({
  declarations: [
    GroupByPipe
  ],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    GroupByPipe,
    FormsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
  entryComponents: [
  ]
})
export class SharedModule { }
