import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AeronaveDocumentoRoutingModule } from './aeronaveDocumento.routing';
import { AeronaveDocumentoAppComponent } from './aeronaveDocumento.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { AeronaveDocumentoService } from './services/aeronaveDocumento.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AeronaveDocumentoResolve } from './services/aeronaveDocumento.resolve';
import { AeronaveDocumentoGuard } from './services/aeronaveDocumento.guard';

@NgModule({
  declarations: [
    AeronaveDocumentoAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    AeronaveDocumentoRoutingModule,
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
    AeronaveDocumentoService,
    AeronaveDocumentoResolve,
    AeronaveDocumentoGuard
  ]
})
export class AeronaveDocumentoModule { }
