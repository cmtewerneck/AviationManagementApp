import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaComponent } from './lista/lista.component';

import { NovoComponent } from './novo/novo.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ClienteAppComponent } from './cliente.app.component';
import { ClienteResolve } from './services/cliente.resolve';
import { ClienteGuard } from './services/cliente.guard';


const clientesRouterConfig: Routes = [
    {
        path: '', component: ClienteAppComponent,
        children: [
            {   path: 'listar-todos', component: ListaComponent,
                canActivate: [ClienteGuard],
                data: [{ claim: { nome: 'Cliente', valor: 'Consultar' } }],
            },
            {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [ClienteGuard],
                canActivate: [ClienteGuard],
                data: [{ claim: { nome: 'Cliente', valor: 'Adicionar' } }],
            },
            {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    cliente: ClienteResolve
                },
                data: [{ claim: { nome: 'Cliente', valor: 'Atualizar' } }],
            },
            {
                path: 'editar/:id', component: EditarComponent,
                resolve: {
                    cliente: ClienteResolve
                },
                canDeactivate: [ClienteGuard],
                canActivate: [ClienteGuard],
                data: [{ claim: { nome: 'Cliente', valor: 'Atualizar' } }],
            },
            {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [ClienteGuard],
                data: [{ claim: { nome: 'Cliente', valor: 'Excluir' } }],
                resolve: {
                    cliente: ClienteResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(clientesRouterConfig)
    ],
    exports: [RouterModule]

})
export class ClientesRoutingModule {}