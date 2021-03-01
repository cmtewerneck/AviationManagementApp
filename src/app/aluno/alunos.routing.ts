import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaComponent } from './lista/lista.component';

import { NovoComponent } from './novo/novo.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { AlunoAppComponent } from './aluno.app.component';
import { AlunoResolve } from './services/aluno.resolve';
import { AlunoGuard } from './services/aluno.guard';


const alunosRouterConfig: Routes = [
    {
        path: '', component: AlunoAppComponent,
        children: [
            {   path: 'listar-todos', component: ListaComponent,
                canActivate: [AlunoGuard],
                data: [{ claim: { nome: 'Aluno', valor: 'Consultar' } }],
            },
            {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [AlunoGuard],
                canActivate: [AlunoGuard],
                data: [{ claim: { nome: 'Aluno', valor: 'Adicionar' } }],
            },
            {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    cliente: AlunoResolve
                },
                data: [{ claim: { nome: 'Aluno', valor: 'Atualizar' } }],
            },
            {
                path: 'editar/:id', component: EditarComponent,
                resolve: {
                    cliente: AlunoResolve
                },
                canDeactivate: [AlunoGuard],
                canActivate: [AlunoGuard],
                data: [{ claim: { nome: 'Aluno', valor: 'Atualizar' } }],
            },
            {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [AlunoGuard],
                data: [{ claim: { nome: 'Aluno', valor: 'Excluir' } }],
                resolve: {
                    cliente: AlunoResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(alunosRouterConfig)
    ],
    exports: [RouterModule]

})
export class AlunosRoutingModule {}