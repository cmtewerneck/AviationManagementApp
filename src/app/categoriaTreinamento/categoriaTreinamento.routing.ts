import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaTreinamentoAppComponent } from './categoriaTreinamento.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { CategoriaTreinamentoResolve } from './services/categoriaTreinamento.resolve';
import { CategoriaTreinamentoGuard } from './services/categoriaTreinamento.guard';

const categoriaTreinamentoRouterConfig: Routes = [
    {
        path: '', component: CategoriaTreinamentoAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [CategoriaTreinamentoGuard],
                canActivate: [CategoriaTreinamentoGuard],
                data: [{ claim: { nome: 'Treinamento', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [CategoriaTreinamentoGuard],
                data: [{ claim: { nome: 'Treinamento', valor: 'Atualizar' } }],
                resolve: {
                    categoriaTreinamento: CategoriaTreinamentoResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    categoriaTreinamento: CategoriaTreinamentoResolve
                }
             }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(categoriaTreinamentoRouterConfig)
    ],
    exports: [RouterModule]
})
export class CategoriaTreinamentoRoutingModule { }