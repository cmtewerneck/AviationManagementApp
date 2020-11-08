import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ContasPagar } from '../models/ContasPagar';
import { ContasPagarService } from './contasPagar.service';

@Injectable()
export class ContasPagarResolve implements Resolve<ContasPagar> {

    constructor(private contasPagarService: ContasPagarService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.contasPagarService.obterPorId(route.params['id']);
    }
}