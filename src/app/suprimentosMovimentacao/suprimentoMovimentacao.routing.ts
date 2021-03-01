import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuprimentoMovimentacaoAppComponent } from './suprimentoMovimentacao.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { SuprimentoMovimentacaoResolve } from './services/suprimentoMovimentacao.resolve';
import { SuprimentoMovimentacaoGuard } from './services/suprimentoMovimentacao.guard';

const suprimentoMovimentacaoRouterConfig: Routes = [
    {
        path: '', component: SuprimentoMovimentacaoAppComponent,
        children: [
             {
                 path: 'listar-todos', component: ListaComponent,
                 canActivate: [SuprimentoMovimentacaoGuard],
                 data: [{ claim: { nome: 'Suprimento', valor: 'Consultar' } }]
             },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [SuprimentoMovimentacaoGuard],
                canActivate: [SuprimentoMovimentacaoGuard],
                data: [{ claim: { nome: 'Suprimento', valor: 'Adicionar' } }]
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [SuprimentoMovimentacaoGuard],
                data: [{ claim: { nome: 'Suprimento', valor: 'Atualizar' } }],
                resolve: {
                    Suprimento: SuprimentoMovimentacaoResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    Suprimento: SuprimentoMovimentacaoResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [SuprimentoMovimentacaoGuard],
                data: [{ claim: { nome: 'Suprimento', valor: 'Excluir' } }],
                resolve: {
                    Suprimento: SuprimentoMovimentacaoResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(suprimentoMovimentacaoRouterConfig)
    ],
    exports: [RouterModule]
})
export class SuprimentoMovimentacaoRoutingModule { }