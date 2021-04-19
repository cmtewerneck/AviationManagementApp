import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AeronaveDiretrizAppComponent } from './aeronaveDiretriz.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { AeronaveDiretrizResolve } from './services/aeronaveDiretriz.resolve';
import { AeronaveDiretrizGuard } from './services/aeronaveDiretriz.guard';

const aeronaveDiretrizRouterConfig: Routes = [
    {
        path: '', component: AeronaveDiretrizAppComponent,
        children: [
             {
                 path: 'listar-todos', component: ListaComponent,
                 data: [{ claim: { nome: 'Diretriz', valor: 'Consultar' } }]
             },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [AeronaveDiretrizGuard],
                canActivate: [AeronaveDiretrizGuard],
                data: [{ claim: { nome: 'Diretriz', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [AeronaveDiretrizGuard],
                data: [{ claim: { nome: 'Diretriz', valor: 'Atualizar' } }],
                resolve: {
                    aeronaveDiretriz: AeronaveDiretrizResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    aeronaveDiretriz: AeronaveDiretrizResolve
                }
             }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(aeronaveDiretrizRouterConfig)
    ],
    exports: [RouterModule]
})
export class AeronaveDiretrizRoutingModule { }