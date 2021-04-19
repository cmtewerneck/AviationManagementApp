import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AeronaveDiretrizRoutingModule } from './aeronaveDiretriz.routing';
import { AeronaveDiretrizAppComponent } from './aeronaveDiretriz.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { AeronaveDiretrizService } from './services/aeronaveDiretriz.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AeronaveDiretrizResolve } from './services/aeronaveDiretriz.resolve';
import { AeronaveDiretrizGuard } from './services/aeronaveDiretriz.guard';

@NgModule({
  declarations: [
    AeronaveDiretrizAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    AeronaveDiretrizRoutingModule,
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
    AeronaveDiretrizService,
    AeronaveDiretrizResolve,
    AeronaveDiretrizGuard
  ]
})
export class AeronaveDiretrizModule { }
