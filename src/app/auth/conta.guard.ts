import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { RegisterComponent } from '../conta/register/register.component';
import { LocalStorageUtils } from '../utils/localStorage';

@Injectable()
export class ContaGuard implements CanDeactivate<RegisterComponent>, CanActivate {

    localStorage = new LocalStorageUtils();

    constructor(private router: Router){}

    canDeactivate(component: RegisterComponent): boolean {
        if(component.mudancasNaoSalvas) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
        }
        return true;
    }

    canActivate() {
        if(this.localStorage.obterTokenUsuario()){
            this.router.navigate(['/dashboard']);
        }

        return true;
    }
}
