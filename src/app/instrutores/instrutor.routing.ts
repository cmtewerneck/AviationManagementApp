import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstrutorAppComponent } from './instrutor.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { InstrutorResolve } from './services/instrutor.resolve';
import { InstrutorGuard } from './services/instrutor.guard';

const instrutorRouterConfig: Routes = [
    {
        path: '', component: InstrutorAppComponent,
        children: [
        {   path: 'listar-todos', component: ListaComponent,
            canActivate: [InstrutorGuard],
            data: [{ claim: { nome: 'Colaborador', valor: 'Consultar' } }],
        },
        {
            path: 'adicionar-novo', component: NovoComponent,
            canDeactivate: [InstrutorGuard],
            canActivate: [InstrutorGuard],
            data: [{ claim: { nome: 'Colaborador', valor: 'Adicionar' } }],
        },
        {
            path: 'editar/:id', component: EditarComponent,
            canActivate: [InstrutorGuard],
            data: [{ claim: { nome: 'Colaborador', valor: 'Atualizar' } }],
            resolve: {
                instrutor: InstrutorResolve
            }
        },
        {
            path: 'detalhes/:id', component: DetalhesComponent,
            resolve: {
                instrutor: InstrutorResolve
            }
        },
        {
            path: 'excluir/:id', component: ExcluirComponent,
            canActivate: [InstrutorGuard],
            data: [{ claim: { nome: 'Colaborador', valor: 'Excluir' } }],
            resolve: {
                instrutor: InstrutorResolve
            }
        },
    ]
}
];

@NgModule({
    imports: [
        RouterModule.forChild(instrutorRouterConfig)
    ],
    exports: [RouterModule]
})
export class InstrutorRoutingModule { }