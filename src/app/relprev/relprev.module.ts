import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { RelprevRoutingModule } from './relprev.routing';
import { RelprevAppComponent } from './relprev.app.component';
import { ListaComponent } from './lista/lista.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    RelprevAppComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    RelprevRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RelprevModule { }
