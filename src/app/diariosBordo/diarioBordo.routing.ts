import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiarioBordoAppComponent } from './diarioBordo.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DiarioBordoResolve } from './services/diarioBordo.resolve';
import { DiarioBordoGuard } from './services/diarioBordo.guard';

const diarioBordoRouterConfig: Routes = [
    {
        path: '', component: DiarioBordoAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [DiarioBordoGuard],
                canActivate: [DiarioBordoGuard],
                data: [{ claim: { nome: 'Diario', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [DiarioBordoGuard],
                data: [{ claim: { nome: 'Diario', valor: 'Atualizar' } }],
                resolve: {
                    diarioBordo: DiarioBordoResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    diarioBordo: DiarioBordoResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [DiarioBordoGuard],
                data: [{ claim: { nome: 'Diario', valor: 'Excluir' } }],
                resolve: {
                    diarioBordo: DiarioBordoResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(diarioBordoRouterConfig)
    ],
    exports: [RouterModule]
})
export class DiarioBordoRoutingModule { }