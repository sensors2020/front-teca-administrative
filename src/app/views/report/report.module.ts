// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ConsumomensualComponent } from './consumomensual.component';
import { ConsumofechaComponent } from './consumofecha.component';

// Theme Routing
import { ReportRoutingModule } from './report-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule } from "ngx-spinner";  

@NgModule({
  imports: [
    CommonModule,
	FormsModule,
    ReportRoutingModule,
	NgxSpinnerModule,
	PaginationModule.forRoot(),
	ModalModule.forRoot()	
  ],
  declarations: [
    ConsumomensualComponent,
    ConsumofechaComponent
  ]
})
export class ReportModule { }
