import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LegislacaoAppComponent } from './legislacao.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { LegislacaoResolve } from './services/legislacao.resolve';
import { LegislacaoGuard } from './services/legislacao.guard';

const legislacaoRouterConfig: Routes = [
    {
        path: '', component: LegislacaoAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [LegislacaoGuard],
                canActivate: [LegislacaoGuard],
                data: [{ claim: { nome: 'Manual', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [LegislacaoGuard],
                data: [{ claim: { nome: 'Manual', valor: 'Atualizar' } }],
                resolve: {
                    legislacao: LegislacaoResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    legislacao: LegislacaoResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [LegislacaoGuard],
                data: [{ claim: { nome: 'Manual', valor: 'Excluir' } }],
                resolve: {
                    legislacao: LegislacaoResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(legislacaoRouterConfig)
    ],
    exports: [RouterModule]
})
export class LegislacaoRoutingModule { }