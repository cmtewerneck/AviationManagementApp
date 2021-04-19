import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';

import { DiariaTripulanteRoutingModule } from './diariaTripulante.routing';
import { DiariaTripulanteAppComponent } from './diariaTripulante.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { DiariaTripulanteService } from './services/diariaTripulante.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DiariaTripulanteResolve } from './services/diariaTripulante.resolve';
import { DiariaTripulanteGuard } from './services/diariaTripulante.guard';

@NgModule({
  declarations: [
    DiariaTripulanteAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    DiariaTripulanteRoutingModule,
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
    DiariaTripulanteService,
    DiariaTripulanteResolve,
    DiariaTripulanteGuard
  ]
})
export class DiariaTripulanteModule { }
