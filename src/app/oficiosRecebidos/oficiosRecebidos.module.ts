import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';

import { OficiosRecebidosRoutingModule } from './oficiosRecebidos.routing';
import { OficioRecebidoAppComponent } from './oficioRecebido.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { OficioRecebidoService } from './services/oficioRecebido.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OficioRecebidoResolve } from './services/oficioRecebido.resolve';
import { OficioRecebidoGuard } from './services/OficioRecebido.guard';

@NgModule({
  declarations: [
    OficioRecebidoAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    OficiosRecebidosRoutingModule,
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
    OficioRecebidoService,
    OficioRecebidoResolve,
    OficioRecebidoGuard
  ]
})
export class OficiosRecebidosModule { }
