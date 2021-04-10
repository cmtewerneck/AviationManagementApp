import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { RastreadorRoutingModule } from './rastreador.routing';
import { RastreadorAppComponent } from './rastreador.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { RastreadorService } from './services/rastreador.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RastreadorResolve } from './services/rastreador.resolve';
import { RastreadorGuard } from './services/rastreador.guard';

@NgModule({
  declarations: [
    RastreadorAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    RastreadorRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    RastreadorService,
    RastreadorResolve,
    RastreadorGuard
  ]
})
export class RastreadorModule { }
