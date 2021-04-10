import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

import { TreinamentoRoutingModule } from './treinamento.routing';
import { TreinamentoAppComponent } from './treinamento.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { TreinamentoService } from './services/treinamento.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TreinamentoResolve } from './services/treinamento.resolve';
import { TreinamentoGuard } from './services/treinamento.guard';

@NgModule({
  declarations: [
    TreinamentoAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    TreinamentoRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    TextMaskModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TreinamentoService,
    TreinamentoResolve,
    TreinamentoGuard
  ]
})
export class TreinamentoModule { }
