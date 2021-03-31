import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';

import { LicencaHabilitacaoRoutingModule } from './licencaHabilitacao.routing';
import { LicencaHabilitacaoAppComponent } from './licencaHabilitacao.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { LicencaHabilitacaoService } from './services/licencaHabilitacao.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LicencaHabilitacaoResolve } from './services/licencaHabilitacao.resolve';
import { LicencaHabilitacaoGuard } from './services/licencaHabilitacao.guard';

@NgModule({
  declarations: [
    LicencaHabilitacaoAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    LicencaHabilitacaoRoutingModule,
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
    LicencaHabilitacaoService,
    LicencaHabilitacaoResolve,
    LicencaHabilitacaoGuard
  ]
})
export class LicencaHabilitacaoModule { }
