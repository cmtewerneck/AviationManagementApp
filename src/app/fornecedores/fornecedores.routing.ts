import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FornecedoresComponent } from './lista/fornecedores.component';

import { AuthGuard } from '../auth/auth.guard';
import { NovoComponent } from './novo/novo.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { FornecedorAppComponent } from './fornecedor.app.component';
import { FornecedorResolve } from './services/fornecedor.resolve';


const fornecedoresRouterConfig: Routes = [
    {
        path: '', component: FornecedorAppComponent,
        children: [
            { path: 'listar-todos', component: FornecedoresComponent },
            { path: 'adicionar-novo', component: NovoComponent },
            {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    fornecedor: FornecedorResolve
                }
            },
            {
                path: 'editar/:id', component: EditarComponent,
                resolve: {
                    fornecedor: FornecedorResolve
                }
                // canActivate: [FornececedorGuard],
                // data: [{ claim: { nome: 'Fornecedor', valor: 'Atualizar' } }],
            },
            {
                path: 'excluir/:id', component: ExcluirComponent,
                // canActivate: [FornececedorGuard],
                // data: [{ claim: { nome: 'Fornecedor', valor: 'Excluir' } }],
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