import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MotoristaAppComponent } from './motorista.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { MotoristaResolve } from './services/motorista.resolve';
import { MotoristaGuard } from './services/motorista.guard';

const motoristaRouterConfig: Routes = [
    {
        path: '', component: MotoristaAppComponent,
        children: [
        {   path: 'listar-todos', component: ListaComponent,
            canActivate: [MotoristaGuard],
            data: [{ claim: { nome: 'Colaborador', valor: 'Consultar' } }],
        },
        {
            path: 'adicionar-novo', component: NovoComponent,
            canDeactivate: [MotoristaGuard],
            canActivate: [MotoristaGuard],
            data: [{ claim: { nome: 'Colaborador', valor: 'Adicionar' } }],
        },
        {
            path: 'editar/:id', component: EditarComponent,
            canActivate: [MotoristaGuard],
            data: [{ claim: { nome: 'Colaborador', valor: 'Atualizar' } }],
            resolve: {
                motorista: MotoristaResolve
            }
        },
        {
            path: 'detalhes/:id', component: DetalhesComponent,
            resolve: {
                motorista: MotoristaResolve
            }
        },
        {
            path: 'excluir/:id', component: ExcluirComponent,
            canActivate: [MotoristaGuard],
            data: [{ claim: { nome: 'Colaborador', valor: 'Excluir' } }],
            resolve: {
                motorista: MotoristaResolve
            }
        },
    ]
}
];

@NgModule({
    imports: [
        RouterModule.forChild(motoristaRouterConfig)
    ],
    exports: [RouterModule]
})
export class MotoristaRoutingModule { }