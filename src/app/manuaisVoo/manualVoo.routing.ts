import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManualVooAppComponent } from './manualVoo.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ManualVooResolve } from './services/manualVoo.resolve';
import { ManualVooGuard } from './services/manualVoo.guard';

const manualVooRouterConfig: Routes = [
    {
        path: '', component: ManualVooAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [ManualVooGuard],
                canActivate: [ManualVooGuard],
                data: [{ claim: { nome: 'Manual', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [ManualVooGuard],
                data: [{ claim: { nome: 'Manual', valor: 'Atualizar' } }],
                resolve: {
                    manualVoo: ManualVooResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    manualVoo: ManualVooResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [ManualVooGuard],
                data: [{ claim: { nome: 'Manual', valor: 'Excluir' } }],
                resolve: {
                    manualVoo: ManualVooResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(manualVooRouterConfig)
    ],
    exports: [RouterModule]
})
export class ManualVooRoutingModule { }