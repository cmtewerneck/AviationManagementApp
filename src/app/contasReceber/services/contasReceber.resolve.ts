import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ContasReceber } from '../models/ContasReceber';
import { ContasReceberService } from './contasReceber.service';

@Injectable()
export class ContasReceberResolve implements Resolve<ContasReceber> {

    constructor(private contasReceberService: ContasReceberService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.contasReceberService.obterPorId(route.params['id']);
    }
}