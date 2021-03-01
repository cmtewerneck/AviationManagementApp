import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';

import { SuprimentoMovimentacaoRoutingModule } from './suprimentoMovimentacao.routing';
import { SuprimentoMovimentacaoAppComponent } from './suprimentoMovimentacao.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { SuprimentoMovimentacaoService } from './services/suprimentoMovimentacao.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SuprimentoMovimentacaoResolve } from './services/suprimentoMovimentacao.resolve';
import { SuprimentoMovimentacaoGuard } from './services/suprimentoMovimentacao.guard';

@NgModule({
  declarations: [
    SuprimentoMovimentacaoAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    SuprimentoMovimentacaoRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule
  ],
  providers: [
    SuprimentoMovimentacaoService,
    SuprimentoMovimentacaoResolve,
    SuprimentoMovimentacaoGuard
  ]
})
export class SuprimentoMovimentacaoModule { }
