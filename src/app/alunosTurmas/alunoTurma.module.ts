import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AlunoTurmaRoutingModule } from './alunoTurma.routing';
import { AlunoTurmaAppComponent } from './alunoTurma.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { AlunoTurmaService } from './services/alunoTurma.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlunoTurmaResolve } from './services/alunoTurma.resolve';
import { AlunoTurmaGuard } from './services/alunoTurma.guard';

@NgModule({
  declarations: [
    AlunoTurmaAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent
  ],
  imports: [
    CommonModule,
    AlunoTurmaRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AlunoTurmaService,
    AlunoTurmaResolve,
    AlunoTurmaGuard
  ]
})
export class AlunoTurmaModule { }
