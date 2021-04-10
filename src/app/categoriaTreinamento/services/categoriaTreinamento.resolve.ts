import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CategoriaTreinamento } from '../models/CategoriaTreinamento';
import { CategoriaTreinamentoService } from './categoriaTreinamento.service';

@Injectable()
export class CategoriaTreinamentoResolve implements Resolve<CategoriaTreinamento> {

    constructor(private categoriaTreinamentoService: CategoriaTreinamentoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.categoriaTreinamentoService.obterPorId(route.params['id']);
    }
}