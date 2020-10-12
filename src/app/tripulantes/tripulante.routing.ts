import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripulanteAppComponent } from './tripulante.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { TripulanteResolve } from './services/tripulante.resolve';
import { TripulanteGuard } from './services/tripulante.guard';

const tripulanteRouterConfig: Routes = [
    {
        path: '', component: TripulanteAppComponent,
        children: [
        {   path: 'listar-todos', component: ListaComponent,
            canActivate: [TripulanteGuard],
            data: [{ claim: { nome: 'Tripulante', valor: 'Consultar' } }],
        },
        {
            path: 'adicionar-novo', component: NovoComponent,
            canDeactivate: [TripulanteGuard],
            canActivate: [TripulanteGuard],
            data: [{ claim: { nome: 'Tripulante', valor: 'Adicionar' } }],
        },
        {
            path: 'editar/:id', component: EditarComponent,
            canActivate: [TripulanteGuard],
            data: [{ claim: { nome: 'Tripulante', valor: 'Atualizar' } }],
            resolve: {
                tripulante: TripulanteResolve
            }
        },
        {
            path: 'detalhes/:id', component: DetalhesComponent,
            resolve: {
                tripulante: TripulanteResolve
            }
        },
        {
            path: 'excluir/:id', component: ExcluirComponent,
            canActivate: [TripulanteGuard],
            data: [{ claim: { nome: 'Tripulante', valor: 'Excluir' } }],
            resolve: {
                tripulante: TripulanteResolve
            }
        },
    ]
}
];

@NgModule({
    imports: [
        RouterModule.forChild(tripulanteRouterConfig)
    ],
    exports: [RouterModule]
})
export class TripulanteRoutingModule { }