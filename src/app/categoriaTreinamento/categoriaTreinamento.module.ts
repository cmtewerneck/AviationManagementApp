import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CategoriaTreinamentoRoutingModule } from './categoriaTreinamento.routing';
import { CategoriaTreinamentoAppComponent } from './categoriaTreinamento.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { CategoriaTreinamentoService } from './services/categoriaTreinamento.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CategoriaTreinamentoResolve } from './services/categoriaTreinamento.resolve';
import { CategoriaTreinamentoGuard } from './services/categoriaTreinamento.guard';

@NgModule({
  declarations: [
    CategoriaTreinamentoAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    CategoriaTreinamentoRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    TextMaskModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CategoriaTreinamentoService,
    CategoriaTreinamentoResolve,
    CategoriaTreinamentoGuard
  ]
})
export class CategoriaTreinamentoModule { }
