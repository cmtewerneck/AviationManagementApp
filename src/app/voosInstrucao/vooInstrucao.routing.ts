import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VooInstrucaoAppComponent } from './vooInstrucao.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { VooInstrucaoResolve } from './services/vooInstrucao.resolve';
import { VooInstrucaoGuard } from './services/vooInstrucao.guard';

const vooInstrucaoRouterConfig: Routes = [
    {
        path: '', component: VooInstrucaoAppComponent,
        children: [
            { path: 'listar-todos', component: ListaComponent },
            {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [VooInstrucaoGuard],
                canActivate: [VooInstrucaoGuard],
                data: [{ claim: { nome: 'Instrucao', valor: 'Adicionar' } }],
            },
            {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [VooInstrucaoGuard],
                data: [{ claim: { nome: 'Instrucao', valor: 'Atualizar' } }],
                resolve: {
                    vooInstrucao: VooInstrucaoResolve
                }
            },
            {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    vooInstrucao: VooInstrucaoResolve
                }
            },
            {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [VooInstrucaoGuard],
                data: [{ claim: { nome: 'Instrucao', valor: 'Excluir' } }],
                resolve: {
                    vooInstrucao: VooInstrucaoResolve
                }
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(vooInstrucaoRouterConfig)
    ],
    exports: [RouterModule]
})
export class VooInstrucaoRoutingModule { }