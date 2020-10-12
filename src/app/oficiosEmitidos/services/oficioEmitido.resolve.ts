import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OficioEmitido } from '../models/oficioEmitido';
import { OficioEmitidoService } from './oficioEmitido.service';

@Injectable()
export class OficioEmitidoResolve implements Resolve<OficioEmitido> {

    constructor(private oficioEmitidoService: OficioEmitidoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.oficioEmitidoService.obterPorId(route.params['id']);
    }
}