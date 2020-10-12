import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OficioEmitidoAppComponent } from './oficioEmitido.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { OficioEmitidoResolve } from './services/oficioEmitido.resolve';
import { OficioEmitidoGuard } from './services/oficioEmitido.guard';

const oficiosEmitidosRouterConfig: Routes = [
    {
        path: '', component: OficioEmitidoAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [OficioEmitidoGuard],
                canActivate: [OficioEmitidoGuard],
                data: [{ claim: { nome: 'Oficio', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [OficioEmitidoGuard],
                data: [{ claim: { nome: 'Oficio', valor: 'Atualizar' } }],
                resolve: {
                    oficioEmitido: OficioEmitidoResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    oficioEmitido: OficioEmitidoResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [OficioEmitidoGuard],
                data: [{ claim: { nome: 'Oficio', valor: 'Excluir' } }],
                resolve: {
                    oficioEmitido: OficioEmitidoResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(oficiosEmitidosRouterConfig)
    ],
    exports: [RouterModule]
})
export class OficiosEmitidosRoutingModule { }