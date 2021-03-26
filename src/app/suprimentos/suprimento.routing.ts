import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuprimentoAppComponent } from './suprimento.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { SuprimentoResolve } from './services/suprimento.resolve';
import { SuprimentoGuard } from './services/suprimento.guard';

const suprimentoRouterConfig: Routes = [
    {
        path: '', component: SuprimentoAppComponent,
        children: [
             {
                 path: 'listar-todos', component: ListaComponent,
                 canActivate: [SuprimentoGuard],
                 data: [{ claim: { nome: 'Suprimento', valor: 'Consultar' } }]
             },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [SuprimentoGuard],
                canActivate: [SuprimentoGuard],
                data: [{ claim: { nome: 'Suprimento', valor: 'Adicionar' } }]
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [SuprimentoGuard],
                data: [{ claim: { nome: 'Suprimento', valor: 'Atualizar' } }],
                resolve: {
                    suprimento: SuprimentoResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    suprimento: SuprimentoResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [SuprimentoGuard],
                data: [{ claim: { nome: 'Suprimento', valor: 'Excluir' } }],
                resolve: {
                    suprimento: SuprimentoResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(suprimentoRouterConfig)
    ],
    exports: [RouterModule]
})
export class SuprimentoRoutingModule { }