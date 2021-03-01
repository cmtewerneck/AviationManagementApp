import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SuprimentoMovimentacao } from '../models/SuprimentoMovimentacao';
import { SuprimentoMovimentacaoService } from './suprimentoMovimentacao.service';

@Injectable()
export class SuprimentoMovimentacaoResolve implements Resolve<SuprimentoMovimentacao> {
    
    constructor(private suprimentoMovimentacaoService: SuprimentoMovimentacaoService) { }
    
    resolve(route: ActivatedRouteSnapshot) {
        return this.suprimentoMovimentacaoService.obterPorId(route.params['id']);
    }
}