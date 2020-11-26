import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegulamenteiAppComponent } from './regulamentei.app.component';
import { ListaComponent } from './lista/lista.component';

const regulamenteiRouterConfig: Routes = [
    {
        path: '', component: RegulamenteiAppComponent,
        children: [
             { path: 'listar-todos', component: ListaComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(regulamenteiRouterConfig)
    ],
    exports: [RouterModule]
})
export class RegulamenteiRoutingModule { }