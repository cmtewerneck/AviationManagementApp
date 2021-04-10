import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Treinamento } from '../models/Treinamento';
import { TreinamentoService } from './treinamento.service';

@Injectable()
export class TreinamentoResolve implements Resolve<Treinamento> {

    constructor(private treinamentoService: TreinamentoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.treinamentoService.obterPorId(route.params['id']);
    }
}