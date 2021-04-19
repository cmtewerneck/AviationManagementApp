import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContaGuard } from '../auth/conta.guard';

import { ContaAppComponent } from './conta.app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListaComponent } from './lista/lista.component';

const contaRouterConfig: Routes = [
    {
        path: '', component: ContaAppComponent,
        children: [
            {
                path: 'listar-todos', component: ListaComponent,
                canActivate: [ContaGuard],
                data: [{ claim: { nome: 'Usuario', valor: 'Consultar' } }]
            },
            { path: 'register', component: RegisterComponent, canActivate: [ContaGuard], canDeactivate: [ContaGuard] },
            { path: 'login', component: LoginComponent, canActivate: [ContaGuard] }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(contaRouterConfig)
    ],
    exports: [RouterModule]

})
export class ContaRoutingModule {}