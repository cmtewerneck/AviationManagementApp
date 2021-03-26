import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunoTurmaAppComponent } from './alunoTurma.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { AlunoTurmaResolve } from './services/alunoTurma.resolve';
import { AlunoTurmaGuard } from './services/alunoTurma.guard';

const alunoTurmaRouterConfig: Routes = [
    {
        path: '', component: AlunoTurmaAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [AlunoTurmaGuard],
                canActivate: [AlunoTurmaGuard],
                data: [{ claim: { nome: 'Turma', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [AlunoTurmaGuard],
                data: [{ claim: { nome: 'Turma', valor: 'Atualizar' } }],
                resolve: {
                    alunoTurma: AlunoTurmaResolve
                }
             }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(alunoTurmaRouterConfig)
    ],
    exports: [RouterModule]
})
export class AlunoTurmaRoutingModule { }