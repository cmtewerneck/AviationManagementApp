// MÓDULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FornecedoresRoutingModule } from './fornecedores.routing';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

// SERVIÇOS
import { FornecedorService } from './services/fornecedor.service';
import { NgBrazil } from 'ng-brazil';

// COMPONENTES
import { FornecedoresComponent } from './lista/fornecedores.component';
import { FornecedorAppComponent } from './fornecedor.app.component';
import { NovoComponent } from './novo/novo.component';
import { ListaProdutosComponent } from './produtos/lista.produtos.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { FornecedorResolve } from './services/fornecedor.resolve';
import { FornecedorGuard } from './services/fornecedor.guard';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
    declarations: [
        FornecedorAppComponent,
        FornecedoresComponent,
        NovoComponent,
        ExcluirComponent,
        EditarComponent,
        DetalhesComponent,
        ListaProdutosComponent
    ],
    imports: [
        CommonModule,
        FornecedoresRoutingModule,
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
        FornecedorService,
        FornecedorResolve,
        FornecedorGuard
    ]
})
export class FornecedoresModule {}