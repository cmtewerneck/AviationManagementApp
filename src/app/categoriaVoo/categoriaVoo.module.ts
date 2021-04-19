import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CategoriaVooRoutingModule } from './categoriaVoo.routing';
import { CategoriaVooAppComponent } from './categoriaVoo.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { CategoriaVooService } from './services/categoriaVoo.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CategoriaVooResolve } from './services/categoriaVoo.resolve';
import { CategoriaVooGuard } from './services/categoriaVoo.guard';

@NgModule({
  declarations: [
    CategoriaVooAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    CategoriaVooRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    TextMaskModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CategoriaVooService,
    CategoriaVooResolve,
    CategoriaVooGuard
  ]
})
export class CategoriaVooModule { }
