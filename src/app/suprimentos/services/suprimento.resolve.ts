import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Suprimento } from '../models/Suprimento';
import { SuprimentoService } from './suprimento.service';

@Injectable()
export class SuprimentoResolve implements Resolve<Suprimento> {

    constructor(private suprimentoService: SuprimentoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.suprimentoService.obterPorId(route.params['id']);
    }
}