import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AeronaveTarifaRoutingModule } from './aeronaveTarifa.routing';
import { AeronaveTarifaAppComponent } from './aeronaveTarifa.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { AeronaveTarifaService } from './services/aeronaveTarifa.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AeronaveTarifaResolve } from './services/aeronaveTarifa.resolve';
import { AeronaveTarifaGuard } from './services/aeronaveTarifa.guard';

@NgModule({
  declarations: [
    AeronaveTarifaAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    AeronaveTarifaRoutingModule,
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
    AeronaveTarifaService,
    AeronaveTarifaResolve,
    AeronaveTarifaGuard
  ]
})
export class AeronaveTarifaModule { }
