import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AeronaveAppComponent } from './aeronave.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { AeronaveResolve } from './services/aeronave.resolve';
import { AeronaveGuard } from './services/aeronave.guard';

const aeronaveRouterConfig: Routes = [
    {
        path: '', component: AeronaveAppComponent,
        children: [
             { 
                 path: 'listar-todos', component: ListaComponent,
                 data: [{ claim: { nome: 'Aeronave', valor: 'Consultar' } }]
             },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [AeronaveGuard],
                canActivate: [AeronaveGuard],
                data: [{ claim: { nome: 'Aeronave', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [AeronaveGuard],
                data: [{ claim: { nome: 'Aeronave', valor: 'Atualizar' } }],
                resolve: {
                    aeronave: AeronaveResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    aeronave: AeronaveResolve
                }
             },
             {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [AeronaveGuard],
                data: [{ claim: { nome: 'Aeronave', valor: 'Excluir' } }],
                resolve: {
                    aeronave: AeronaveResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(aeronaveRouterConfig)
    ],
    exports: [RouterModule]
})
export class AeronaveRoutingModule { }