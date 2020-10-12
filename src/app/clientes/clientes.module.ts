// MÓDULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesRoutingModule } from './clientes.routing';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

// SERVIÇOS
import { ClienteService } from './services/cliente.service';
import { NgBrazil } from 'ng-brazil';

// COMPONENTES
import { ListaComponent } from './lista/lista.component';
import { ClienteAppComponent } from './cliente.app.component';
import { NovoComponent } from './novo/novo.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ClienteResolve } from './services/cliente.resolve';
import { ClienteGuard } from './services/cliente.guard';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
    declarations: [
        ClienteAppComponent,
        ListaComponent,
        NovoComponent,
        ExcluirComponent,
        EditarComponent,
        DetalhesComponent
    ],
    imports: [
        CommonModule,
        ClientesRoutingModule,
        FormsModule,
        RouterModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        NgBrazil,
        TextMaskModule,
        NgxSpinnerModule
    ],
    providers: [
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: AuthInterceptor,
        //     multi: true
        // },
        ClienteService,
        ClienteResolve,
        ClienteGuard
    ]
})
export class ClientesModule {}