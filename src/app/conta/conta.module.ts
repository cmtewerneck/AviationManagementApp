// MÓDULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContaRoutingModule } from './conta.routing';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { ContaGuard } from '../auth/conta.guard';


// COMPONENTES
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContaAppComponent } from './conta.app.component';

@NgModule({
    declarations: [
        ContaAppComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ContaRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    providers: [
        AuthService,
        ContaGuard
    ]
})
export class ContaModule { }