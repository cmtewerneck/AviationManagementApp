import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { LicencaHabilitacao } from '../models/LicencaHabilitacao';
import { LicencaHabilitacaoService } from './licencaHabilitacao.service';

@Injectable()
export class LicencaHabilitacaoResolve implements Resolve<LicencaHabilitacao> {

    constructor(private licencaHabilitacaoService: LicencaHabilitacaoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.licencaHabilitacaoService.obterPorId(route.params['id']);
    }
}