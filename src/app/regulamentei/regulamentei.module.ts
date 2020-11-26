import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { RegulamenteiRoutingModule } from './regulamentei.routing';
import { RegulamenteiAppComponent } from './regulamentei.app.component';
import { ListaComponent } from './lista/lista.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    RegulamenteiAppComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    RegulamenteiRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegulamenteiModule { }
