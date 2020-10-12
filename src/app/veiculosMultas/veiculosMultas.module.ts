import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';

import { VeiculoMultaRoutingModule } from './veiculoMulta.routing';
import { VeiculoMultaAppComponent } from './veiculoMulta.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { VeiculoMultaService } from './services/veiculoMulta.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { VeiculoMultaResolve } from './services/veiculoMulta.resolve';
import { VeiculoMultaGuard } from './services/veiculoMulta.guard';

@NgModule({
  declarations: [
    VeiculoMultaAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    VeiculoMultaRoutingModule,
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
    VeiculoMultaService,
    VeiculoMultaResolve,
    VeiculoMultaGuard
  ]
})
export class VeiculoMultaModule { }
