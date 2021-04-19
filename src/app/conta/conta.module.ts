// MÓDULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContaRoutingModule } from './conta.routing';
import { HttpClientModule } from '@angular/common/http';
import { NgBrazil } from 'ng-brazil';

import { AuthService } from './services/auth.service';
import { ContaGuard } from '../auth/conta.guard';


// COMPONENTES
import { LoginComponent } from './login/login.component';
import { ListaComponent } from './lista/lista.component';
import { RegisterComponent } from './register/register.component';
import { ContaAppComponent } from './conta.app.component';

@NgModule({
    declarations: [
        ContaAppComponent,
        LoginComponent,
        ListaComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ContaRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgBrazil
    ],
    providers: [
        AuthService,
        ContaGuard
    ]
})
export class ContaModule { }