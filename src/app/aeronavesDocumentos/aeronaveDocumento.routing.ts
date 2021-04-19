import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AeronaveDocumentoAppComponent } from './aeronaveDocumento.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { AeronaveDocumentoResolve } from './services/aeronaveDocumento.resolve';
import { AeronaveDocumentoGuard } from './services/aeronaveDocumento.guard';

const aeronaveDocumentoRouterConfig: Routes = [
    {
        path: '', component: AeronaveDocumentoAppComponent,
        children: [
             {
                 path: 'listar-todos', component: ListaComponent,
                 data: [{ claim: { nome: 'Aeronave', valor: 'Consultar' } }]
             },
             {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [AeronaveDocumentoGuard],
                canActivate: [AeronaveDocumentoGuard],
                data: [{ claim: { nome: 'Aeronave', valor: 'Adicionar' } }],
             },
             {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [AeronaveDocumentoGuard],
                data: [{ claim: { nome: 'Aeronave', valor: 'Atualizar' } }],
                resolve: {
                    aeronaveDocumento: AeronaveDocumentoResolve
                }
             },
             {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    aeronaveDocumento: AeronaveDocumentoResolve
                }
             },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(aeronaveDocumentoRouterConfig)
    ],
    exports: [RouterModule]
})
export class AeronaveDocumentoRoutingModule { }