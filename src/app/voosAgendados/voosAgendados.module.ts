import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';

import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import listPlugin from '@fullcalendar/list';

import { VooAgendadoRoutingModule } from './vooAgendado.routing';
import { VooAgendadoAppComponent } from './vooAgendado.app.component';
import { ListaComponent } from './lista/lista.component';
import { ListaGridComponent } from './listaGrid/listaGrid.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { VooAgendadoService } from './services/vooAgendado.service';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { VooAgendadoResolve } from './services/vooAgendado.resolve';
import { VooAgendadoGuard } from './services/vooAgendado.guard';

FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin,
  listPlugin
]);

@NgModule({
  declarations: [
    VooAgendadoAppComponent,
    ListaComponent,
    ListaGridComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    VooAgendadoRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    FullCalendarModule // register FullCalendar with you app
  ],
  providers: [
    VooAgendadoService,
    VooAgendadoResolve,
    VooAgendadoGuard
  ]
})
export class VooAgendadoModule { }
