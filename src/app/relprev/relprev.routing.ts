import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RelprevAppComponent } from './relprev.app.component';
import { ListaComponent } from './lista/lista.component';

const relprevRouterConfig: Routes = [
    {
        path: '', component: RelprevAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(relprevRouterConfig)
    ],
    exports: [RouterModule]
})
export class RelprevRoutingModule { }