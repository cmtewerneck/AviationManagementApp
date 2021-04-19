import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AeronaveMotorAppComponent } from './aeronaveMotor.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { AeronaveMotorResolve } from './services/aeronaveMotor.resolve';
import { AeronaveMotorGuard } from './services/aeronaveMotor.guard';

const aeronaveMotorRouterConfig: Routes = [
    {
        path: '', component: AeronaveMotorAppComponent,
        children: [
             {
                 path: 'listar-todos', component: ListaComponent,
                 data: [{ claim: { nome: 'Motor', valor: 'Consultar' } }]
             },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [AeronaveMotorGuard],
                canActivate: [AeronaveMotorGuard],
                data: [{ claim: { nome: 'Motor', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [AeronaveMotorGuard],
                data: [{ claim: { nome: 'Motor', valor: 'Atualizar' } }],
                resolve: {
                    aeronaveMotor: AeronaveMotorResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    aeronaveMotor: AeronaveMotorResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(aeronaveMotorRouterConfig)
    ],
    exports: [RouterModule]
})
export class AeronaveMotorRoutingModule { }