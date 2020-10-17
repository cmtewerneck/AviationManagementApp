import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';

import { VeiculoGastoRoutingModule } from './veiculoGasto.routing';
import { VeiculoGastoAppComponent } from './veiculoGasto.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { VeiculoGastoService } from './services/veiculoGasto.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { VeiculoGastoResolve } from './services/veiculoGasto.resolve';
import { VeiculoGastoGuard } from './services/veiculoGasto.guard';

@NgModule({
  declarations: [
    VeiculoGastoAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    VeiculoGastoRoutingModule,
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
    VeiculoGastoService,
    VeiculoGastoResolve,
    VeiculoGastoGuard
  ]
})
export class VeiculoGastoModule { }
