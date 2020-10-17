import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManualEmpresaAppComponent } from './manualEmpresa.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ManualEmpresaResolve } from './services/manualEmpresa.resolve';
import { ManualEmpresaGuard } from './services/manualEmpresa.guard';

const manualEmpresaRouterConfig: Routes = [
    {
        path: '', component: ManualEmpresaAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [ManualEmpresaGuard],
                canActivate: [ManualEmpresaGuard],
                data: [{ claim: { nome: 'Manual', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [ManualEmpresaGuard],
                data: [{ claim: { nome: 'Manual', valor: 'Atualizar' } }],
                resolve: {
                    manualEmpresa: ManualEmpresaResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    manualEmpresa: ManualEmpresaResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [ManualEmpresaGuard],
                data: [{ claim: { nome: 'Manual', valor: 'Excluir' } }],
                resolve: {
                    manualEmpresa: ManualEmpresaResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(manualEmpresaRouterConfig)
    ],
    exports: [RouterModule]
})
export class ManualEmpresaRoutingModule { }