import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';

import { VooInstrucaoRoutingModule } from './vooInstrucao.routing';
import { VooInstrucaoAppComponent } from './vooInstrucao.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { VooInstrucaoService } from './services/vooInstrucao.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { VooInstrucaoResolve } from './services/vooInstrucao.resolve';
import { VooInstrucaoGuard } from './services/vooInstrucao.guard';

@NgModule({
  declarations: [
    VooInstrucaoAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    VooInstrucaoRoutingModule,
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
    VooInstrucaoService,
    VooInstrucaoResolve,
    VooInstrucaoGuard
  ]
})
export class VooInstrucaoModule { }
