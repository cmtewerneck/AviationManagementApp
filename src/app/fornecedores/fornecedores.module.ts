// MÓDULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { FornecedoresRoutingModule } from './fornecedores.routing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';

// SERVIÇOS
import { FornecedorService } from './services/fornecedor.service';
import { AuthInterceptor } from '../auth/auth.interceptor';

// COMPONENTES
import { FornecedoresComponent } from './lista/fornecedores.component';
import { FornecedorAppComponent } from './fornecedor.app.component';
import { NovoComponent } from './novo/novo.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { FornecedorResolve } from './services/fornecedor.resolve';


@NgModule({
    declarations: [
        FornecedoresComponent,
        NovoComponent,
        ExcluirComponent,
        EditarComponent,
        DetalhesComponent,
        FornecedorAppComponent
    ],
    imports: [
        CommonModule,
        NgxSpinnerModule,
        ModalModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgBrazil,
        FornecedoresRoutingModule,
        TextMaskModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        FornecedorService,
        FornecedorResolve
    ]
})
export class FornecedoresModule {}