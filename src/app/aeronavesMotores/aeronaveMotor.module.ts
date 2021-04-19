import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AeronaveMotorRoutingModule } from './aeronaveMotor.routing';
import { AeronaveMotorAppComponent } from './aeronaveMotor.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { AeronaveMotorService } from './services/aeronaveMotor.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AeronaveMotorResolve } from './services/aeronaveMotor.resolve';
import { AeronaveMotorGuard } from './services/aeronaveMotor.guard';

@NgModule({
  declarations: [
    AeronaveMotorAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    AeronaveMotorRoutingModule,
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
    AeronaveMotorService,
    AeronaveMotorResolve,
    AeronaveMotorGuard
  ]
})
export class AeronaveMotorModule { }
