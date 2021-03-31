import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicencaHabilitacaoAppComponent } from './licencaHabilitacao.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { LicencaHabilitacaoResolve } from './services/licencaHabilitacao.resolve';
import { LicencaHabilitacaoGuard } from './services/licencaHabilitacao.guard';

const licencaHabilitacaoRouterConfig: Routes = [
    {
        path: '', component: LicencaHabilitacaoAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [LicencaHabilitacaoGuard],
                canActivate: [LicencaHabilitacaoGuard],
                data: [{ claim: { nome: 'LicencaHabilitacao', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [LicencaHabilitacaoGuard],
                data: [{ claim: { nome: 'LicencaHabilitacao', valor: 'Atualizar' } }],
                resolve: {
                    licencaHabilitacao: LicencaHabilitacaoResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    licencaHabilitacao: LicencaHabilitacaoResolve
                }
             }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(licencaHabilitacaoRouterConfig)
    ],
    exports: [RouterModule]
})
export class LicencaHabilitacaoRoutingModule { }