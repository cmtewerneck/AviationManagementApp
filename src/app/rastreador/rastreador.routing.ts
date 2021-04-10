import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RastreadorAppComponent } from './rastreador.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { RastreadorResolve } from './services/rastreador.resolve';
import { RastreadorGuard } from './services/rastreador.guard';

const rastreadorRouterConfig: Routes = [
    {
        path: '', component: RastreadorAppComponent,
        children: [
             {
                 path: 'listar-todos', component: ListaComponent,
                 data: [{ claim: { nome: 'Rastreador', valor: 'Consultar' } }]
             },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [RastreadorGuard],
                canActivate: [RastreadorGuard],
                data: [{ claim: { nome: 'Rastreador', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [RastreadorGuard],
                data: [{ claim: { nome: 'Rastreador', valor: 'Atualizar' } }],
                resolve: {
                    rastreador: RastreadorResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    rastreador: RastreadorResolve
                }
             }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(rastreadorRouterConfig)
    ],
    exports: [RouterModule]
})
export class RastreadorRoutingModule { }