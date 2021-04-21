import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { deLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
defineLocale('pt-br', deLocale);

import { DiarioBordoRoutingModule } from './diarioBordo.routing';
import { DiarioBordoAppComponent } from './diarioBordo.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { DiarioBordoService } from './services/diarioBordo.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DiarioBordoResolve } from './services/diarioBordo.resolve';
import { DiarioBordoGuard } from './services/diarioBordo.guard';
import { DateFormatPipe } from '../_helps/DateFormat.pipe';

@NgModule({
  declarations: [
    DiarioBordoAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    DiarioBordoRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [
    DiarioBordoService,
    DiarioBordoResolve,
    DiarioBordoGuard
  ]
})
export class DiarioBordoModule { }
