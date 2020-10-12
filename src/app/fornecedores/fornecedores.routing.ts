import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FornecedoresComponent } from './lista/fornecedores.component';

import { NovoComponent } from './novo/novo.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { FornecedorAppComponent } from './fornecedor.app.component';
import { FornecedorResolve } from './services/fornecedor.resolve';
import { FornecedorGuard } from './services/fornecedor.guard';


const fornecedoresRouterConfig: Routes = [
    {
        path: '', component: FornecedorAppComponent,
        children: [
            {   path: 'listar-todos', component: FornecedoresComponent,
                canActivate: [FornecedorGuard],
                data: [{ claim: { nome: 'Fornecedor', valor: 'Consultar' } }],
            },
            {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [FornecedorGuard],
                canActivate: [FornecedorGuard],
                data: [{ claim: { nome: 'Fornecedor', valor: 'Adicionar' } }],
            },
            {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    fornecedor: FornecedorResolve
                },
                data: [{ claim: { nome: 'Fornecedor', valor: 'Atualizar' } }],
            },
            {
                path: 'editar/:id', component: EditarComponent,
                resolve: {
                    fornecedor: FornecedorResolve
                },
                canDeactivate: [FornecedorGuard],
                canActivate: [FornecedorGuard],
                data: [{ claim: { nome: 'Fornecedor', valor: 'Atualizar' } }],
            },
            {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [FornecedorGuard],
                data: [{ claim: { nome: 'Fornecedor', valor: 'Excluir' } }],
                resolve: {
                    fornecedor: FornecedorResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(fornecedoresRouterConfig)
    ],
    exports: [RouterModule]

})
export class FornecedoresRoutingModule {}