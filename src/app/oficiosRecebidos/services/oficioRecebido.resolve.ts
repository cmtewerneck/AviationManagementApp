import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OficioRecebido } from '../models/OficioRecebido';
import { OficioRecebidoService } from './oficioRecebido.service';

@Injectable()
export class OficioRecebidoResolve implements Resolve<OficioRecebido> {

    constructor(private oficioRecebidoService: OficioRecebidoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.oficioRecebidoService.obterPorId(route.params['id']);
    }
}