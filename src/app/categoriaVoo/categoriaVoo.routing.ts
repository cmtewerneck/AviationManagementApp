import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaVooAppComponent } from './categoriaVoo.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { CategoriaVooResolve } from './services/categoriaVoo.resolve';
import { CategoriaVooGuard } from './services/categoriaVoo.guard';

const categoriaVooRouterConfig: Routes = [
    {
        path: '', component: CategoriaVooAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [CategoriaVooGuard],
                canActivate: [CategoriaVooGuard],
                data: [{ claim: { nome: 'Agendamento', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [CategoriaVooGuard],
                data: [{ claim: { nome: 'Agendamento', valor: 'Atualizar' } }],
                resolve: {
                    categoriaVoo: CategoriaVooResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    categoriaVoo: CategoriaVooResolve
                }
             }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(categoriaVooRouterConfig)
    ],
    exports: [RouterModule]
})
export class CategoriaVooRoutingModule { }