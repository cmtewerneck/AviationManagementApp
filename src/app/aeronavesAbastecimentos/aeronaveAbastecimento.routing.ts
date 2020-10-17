import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AeronaveAbastecimentoAppComponent } from './aeronaveAbastecimento.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { AeronaveAbastecimentoResolve } from './services/aeronaveAbastecimento.resolve';
import { AeronaveAbastecimentoGuard } from './services/aeronaveAbastecimento.guard';

const aeronaveAbastecimentoRouterConfig: Routes = [
    {
        path: '', component: AeronaveAbastecimentoAppComponent,
        children: [
             {
                 path: 'listar-todos', component: ListaComponent,
                 data: [{ claim: { nome: 'Aeronave', valor: 'Consultar' } }]
             },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [AeronaveAbastecimentoGuard],
                canActivate: [AeronaveAbastecimentoGuard],
                data: [{ claim: { nome: 'Aeronave', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [AeronaveAbastecimentoGuard],
                data: [{ claim: { nome: 'Aeronave', valor: 'Atualizar' } }],
                resolve: {
                    aeronaveAbastecimento: AeronaveAbastecimentoResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    aeronaveAbastecimento: AeronaveAbastecimentoResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [AeronaveAbastecimentoGuard],
                data: [{ claim: { nome: 'Aeronave', valor: 'Excluir' } }],
                resolve: {
                    aeronaveAbastecimento: AeronaveAbastecimentoResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(aeronaveAbastecimentoRouterConfig)
    ],
    exports: [RouterModule]
})
export class AeronaveAbastecimentoRoutingModule { }