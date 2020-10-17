import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AeronaveAbastecimento } from '../models/AeronaveAbastecimento';
import { AeronaveAbastecimentoService } from './aeronaveAbastecimento.service';

@Injectable()
export class AeronaveAbastecimentoResolve implements Resolve<AeronaveAbastecimento> {

    constructor(private aeronaveAbastecimentoService: AeronaveAbastecimentoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.aeronaveAbastecimentoService.obterPorId(route.params['id']);
    }
}