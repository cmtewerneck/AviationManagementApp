import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EscalaAppComponent } from './escala.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EscalaResolve } from './services/escala.resolve';
import { EscalaGuard } from './services/escala.guard';

const escalaRouterConfig: Routes = [
    {
        path: '', component: EscalaAppComponent,
        children: [
            {
                path: 'listar-todos', component: ListaComponent,
                canActivate: [EscalaGuard],
                data: [{ claim: { nome: 'Escala', valor: 'Consultar' } }]
            },
            {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [EscalaGuard],
                canActivate: [EscalaGuard],
                data: [{ claim: { nome: 'Escala', valor: 'Adicionar' } }]
            },
            {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [EscalaGuard],
                data: [{ claim: { nome: 'Escala', valor: 'Atualizar' } }],
                resolve: {
                    escala: EscalaResolve
                }
            },
            {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    escala: EscalaResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(escalaRouterConfig)
    ],
    exports: [RouterModule]
})
export class EscalaRoutingModule { }