import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    UsersRoutingModule,
    ChartsModule,
	CommonModule,
	FormsModule,
    BsDropdownModule,
	PaginationModule.forRoot(),
	ModalModule.forRoot()
  ],
  declarations: [ UsersComponent ]
})
export class UsersModule { }
