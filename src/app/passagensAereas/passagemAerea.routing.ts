import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PassagemAereaAppComponent } from './passagemAerea.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { PassagemAereaResolve } from './services/passagemAerea.resolve';
import { PassagemAereaGuard } from './services/passagemAerea.guard';

const passagemAereaRouterConfig: Routes = [
    {
        path: '', component: PassagemAereaAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [PassagemAereaGuard],
                canActivate: [PassagemAereaGuard],
                data: [{ claim: { nome: 'Passagem', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [PassagemAereaGuard],
                data: [{ claim: { nome: 'Passagem', valor: 'Atualizar' } }],
                resolve: {
                    passagemAerea: PassagemAereaResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    passagemAerea: PassagemAereaResolve
                }
             }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(passagemAereaRouterConfig)
    ],
    exports: [RouterModule]
})
export class PassagemAereaRoutingModule { }