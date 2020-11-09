import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TarifasComponent } from './tarifas.component';
import { TarifasRoutingModule } from './tarifas-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    TarifasRoutingModule,
    ChartsModule,
	CommonModule,
	FormsModule,
    BsDropdownModule,
	PaginationModule.forRoot(),
	ModalModule.forRoot()
  ],
  declarations: [ TarifasComponent ]
})
export class TarifasModule { }
