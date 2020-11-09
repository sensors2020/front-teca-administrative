import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WidgetsComponent } from './widgets.component';
import { WidgetsRoutingModule } from './widgets-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    WidgetsRoutingModule,
    ChartsModule,
	CommonModule,
	FormsModule,
    BsDropdownModule,
	PaginationModule.forRoot(),
	ModalModule.forRoot()
  ],
  declarations: [ WidgetsComponent ]
})
export class WidgetsModule { }
