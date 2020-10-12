import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Estoque } from '../models/estoque';
import { EstoqueService } from './estoque.service';

@Injectable()
export class EstoqueResolve implements Resolve<Estoque> {

    constructor(private estoqueService: EstoqueService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.estoqueService.obterPorId(route.params['id']);
    }
}