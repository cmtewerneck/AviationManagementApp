import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MecanicoAppComponent } from './mecanico.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { MecanicoResolve } from './services/mecanico.resolve';
import { MecanicoGuard } from './services/mecanico.guard';

const mecanicoRouterConfig: Routes = [
    {
        path: '', component: MecanicoAppComponent,
        children: [
        {   path: 'listar-todos', component: ListaComponent,
            canActivate: [MecanicoGuard],
            data: [{ claim: { nome: 'Mecanico', valor: 'Consultar' } }],
        },
        {
            path: 'adicionar-novo', component: NovoComponent,
            canDeactivate: [MecanicoGuard],
            canActivate: [MecanicoGuard],
            data: [{ claim: { nome: 'Mecanico', valor: 'Adicionar' } }],
        },
        {
            path: 'editar/:id', component: EditarComponent,
            canActivate: [MecanicoGuard],
            data: [{ claim: { nome: 'Mecanico', valor: 'Atualizar' } }],
            resolve: {
                mecanico: MecanicoResolve
            }
        },
        {
            path: 'detalhes/:id', component: DetalhesComponent,
            resolve: {
                mecanico: MecanicoResolve
            }
        },
        {
            path: 'excluir/:id', component: ExcluirComponent,
            canActivate: [MecanicoGuard],
            data: [{ claim: { nome: 'Mecanico', valor: 'Excluir' } }],
            resolve: {
                mecanico: MecanicoResolve
            }
        },
    ]
}
];

@NgModule({
    imports: [
        RouterModule.forChild(mecanicoRouterConfig)
    ],
    exports: [RouterModule]
})
export class MecanicoRoutingModule { }