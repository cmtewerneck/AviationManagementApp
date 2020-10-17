import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { VeiculoGasto } from '../models/veiculoGasto';
import { VeiculoGastoService } from './veiculoGasto.service';

@Injectable()
export class VeiculoGastoResolve implements Resolve<VeiculoGasto> {

    constructor(private veiculoGastoService: VeiculoGastoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.veiculoGastoService.obterPorId(route.params['id']);
    }
}