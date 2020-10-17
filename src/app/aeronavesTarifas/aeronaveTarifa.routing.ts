import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AeronaveTarifaAppComponent } from './aeronaveTarifa.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { AeronaveTarifaResolve } from './services/aeronaveTarifa.resolve';
import { AeronaveTarifaGuard } from './services/aeronaveTarifa.guard';

const aeronaveTarifaRouterConfig: Routes = [
    {
        path: '', component: AeronaveTarifaAppComponent,
        children: [
             {
                 path: 'listar-todos', component: ListaComponent,
                 data: [{ claim: { nome: 'Aeronave', valor: 'Consultar' } }]
             },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [AeronaveTarifaGuard],
                canActivate: [AeronaveTarifaGuard],
                data: [{ claim: { nome: 'Aeronave', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [AeronaveTarifaGuard],
                data: [{ claim: { nome: 'Aeronave', valor: 'Atualizar' } }],
                resolve: {
                    aeronaveTarifa: AeronaveTarifaResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    aeronaveTarifa: AeronaveTarifaResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [AeronaveTarifaGuard],
                data: [{ claim: { nome: 'Aeronave', valor: 'Excluir' } }],
                resolve: {
                    aeronaveTarifa: AeronaveTarifaResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(aeronaveTarifaRouterConfig)
    ],
    exports: [RouterModule]
})
export class AeronaveTarifaRoutingModule { }