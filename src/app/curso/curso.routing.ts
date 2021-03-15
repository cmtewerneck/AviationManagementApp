import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursoAppComponent } from './curso.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { CursoResolve } from './services/curso.resolve';
import { CursoGuard } from './services/curso.guard';

const cursoRouterConfig: Routes = [
    {
        path: '', component: CursoAppComponent,
        children: [
            {
                path: 'listar-todos', component: ListaComponent,
                canActivate: [CursoGuard],
                data: [{ claim: { nome: 'Curso', valor: 'Consultar' } }]
            },
            {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [CursoGuard],
                canActivate: [CursoGuard],
                data: [{ claim: { nome: 'Curso', valor: 'Adicionar' } }]
            },
            {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [CursoGuard],
                data: [{ claim: { nome: 'Curso', valor: 'Atualizar' } }],
                resolve: {
                    curso: CursoResolve
                }
            },
            {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    curso: CursoResolve
                }
            },
            {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [CursoGuard],
                data: [{ claim: { nome: 'Curso', valor: 'Excluir' } }],
                resolve: {
                    curso: CursoResolve
                }
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(cursoRouterConfig)
    ],
    exports: [RouterModule]
})
export class CursoRoutingModule { }