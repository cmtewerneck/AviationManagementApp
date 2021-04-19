import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiariaTripulanteAppComponent } from './diariaTripulante.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { DiariaTripulanteResolve } from './services/diariaTripulante.resolve';
import { DiariaTripulanteGuard } from './services/diariaTripulante.guard';

const diariaTripulanteRouterConfig: Routes = [
    {
        path: '', component: DiariaTripulanteAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [DiariaTripulanteGuard],
                canActivate: [DiariaTripulanteGuard],
                data: [{ claim: { nome: 'Tripulante', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [DiariaTripulanteGuard],
                data: [{ claim: { nome: 'Tripulante', valor: 'Atualizar' } }],
                resolve: {
                    diariaTripulante: DiariaTripulanteResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                   diariaTripulante: DiariaTripulanteResolve
                }
             }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(diariaTripulanteRouterConfig)
    ],
    exports: [RouterModule]
})
export class DiariaTripulanteRoutingModule { }