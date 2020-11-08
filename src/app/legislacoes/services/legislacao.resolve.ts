import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Legislacao } from '../models/Legislacao';
import { LegislacaoService } from './legislacao.service';

@Injectable()
export class LegislacaoResolve implements Resolve<Legislacao> {

    constructor(private legislacaoService: LegislacaoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.legislacaoService.obterPorId(route.params['id']);
    }
}