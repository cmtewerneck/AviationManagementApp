import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VooAgendadoAppComponent } from './vooAgendado.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { VooAgendadoResolve } from './services/vooAgendado.resolve';
import { VooAgendadoGuard } from './services/vooAgendado.guard';

const vooAgendadoRouterConfig: Routes = [
    {
        path: '', component: VooAgendadoAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [VooAgendadoGuard],
                canActivate: [VooAgendadoGuard],
                data: [{ claim: { nome: 'Aeronave', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [VooAgendadoGuard],
                data: [{ claim: { nome: 'Aeronave', valor: 'Atualizar' } }],
                resolve: {
                    vooAgendado: VooAgendadoResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    vooAgendado: VooAgendadoResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [VooAgendadoGuard],
                data: [{ claim: { nome: 'Aeronave', valor: 'Excluir' } }],
                resolve: {
                    vooAgendado: VooAgendadoResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(vooAgendadoRouterConfig)
    ],
    exports: [RouterModule]
})
export class VooAgendadoRoutingModule { }