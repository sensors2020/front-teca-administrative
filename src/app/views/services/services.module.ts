// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { WaterComponent } from './water.component';

// Theme Routing
import { ServicesRoutingModule } from './services-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    CommonModule,
	FormsModule,
    ServicesRoutingModule,
	BsDropdownModule,
	PaginationModule.forRoot(),
	ModalModule.forRoot()	
  ],
  declarations: [
    WaterComponent
  ]
})
export class ServicesModule { }
