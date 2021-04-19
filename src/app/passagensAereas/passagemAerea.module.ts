import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgBrazil } from 'ng-brazil';

import { PassagemAereaRoutingModule } from './passagemAerea.routing';
import { PassagemAereaAppComponent } from './passagemAerea.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { PassagemAereaService } from './services/passagemAerea.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PassagemAereaResolve } from './services/passagemAerea.resolve';
import { PassagemAereaGuard } from './services/passagemAerea.guard';

@NgModule({
  declarations: [
    PassagemAereaAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    PassagemAereaRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    NgxSpinnerModule,
    FormsModule,
    NgBrazil,
    ReactiveFormsModule
  ],
  providers: [
    PassagemAereaService,
    PassagemAereaResolve,
    PassagemAereaGuard
  ]
})
export class PassagemAereaModule { }
