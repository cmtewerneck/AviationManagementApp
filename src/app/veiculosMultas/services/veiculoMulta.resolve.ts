import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { VeiculoMulta } from '../models/VeiculoMulta';
import { VeiculoMultaService } from './veiculoMulta.service';

@Injectable()
export class VeiculoMultaResolve implements Resolve<VeiculoMulta> {

    constructor(private veiculoMultaService: VeiculoMultaService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.veiculoMultaService.obterPorId(route.params['id']);
    }
}