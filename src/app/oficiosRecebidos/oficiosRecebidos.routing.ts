import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OficioRecebidoAppComponent } from './oficioRecebido.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { OficioRecebidoResolve } from './services/oficioRecebido.resolve';
import { OficioRecebidoGuard } from './services/OficioRecebido.guard';

const oficiosRecebidosRouterConfig: Routes = [
    {
        path: '', component: OficioRecebidoAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [OficioRecebidoGuard],
                canActivate: [OficioRecebidoGuard],
                data: [{ claim: { nome: 'Oficio', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [OficioRecebidoGuard],
                data: [{ claim: { nome: 'Oficio', valor: 'Atualizar' } }],
                resolve: {
                    oficioRecebido: OficioRecebidoResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    oficioRecebido: OficioRecebidoResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [OficioRecebidoGuard],
                data: [{ claim: { nome: 'Oficio', valor: 'Excluir' } }],
                resolve: {
                    oficioRecebido: OficioRecebidoResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(oficiosRecebidosRouterConfig)
    ],
    exports: [RouterModule]
})
export class OficiosRecebidosRoutingModule { }