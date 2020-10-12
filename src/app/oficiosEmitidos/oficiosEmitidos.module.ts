import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';

import { OficiosEmitidosRoutingModule } from './oficiosEmitidos.routing';
import { OficioEmitidoAppComponent } from './oficioEmitido.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { OficioEmitidoService } from './services/oficioEmitido.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OficioEmitidoResolve } from './services/oficioEmitido.resolve';
import { OficioEmitidoGuard } from './services/oficioEmitido.guard';

@NgModule({
  declarations: [
    OficioEmitidoAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    OficiosEmitidosRoutingModule,
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
    OficioEmitidoService,
    OficioEmitidoResolve,
    OficioEmitidoGuard
  ]
})
export class OficiosEmitidosModule { }
