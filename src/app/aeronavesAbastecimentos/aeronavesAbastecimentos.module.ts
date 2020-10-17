import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AeronaveAbastecimentoRoutingModule } from './aeronaveAbastecimento.routing';
import { AeronaveAbastecimentoAppComponent } from './aeronaveAbastecimento.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { AeronaveAbastecimentoService } from './services/aeronaveAbastecimento.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AeronaveAbastecimentoResolve } from './services/aeronaveAbastecimento.resolve';
import { AeronaveAbastecimentoGuard } from './services/aeronaveAbastecimento.guard';

@NgModule({
  declarations: [
    AeronaveAbastecimentoAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    AeronaveAbastecimentoRoutingModule,
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
    AeronaveAbastecimentoService,
    AeronaveAbastecimentoResolve,
    AeronaveAbastecimentoGuard
  ]
})
export class AeronaveAbastecimentoModule { }
