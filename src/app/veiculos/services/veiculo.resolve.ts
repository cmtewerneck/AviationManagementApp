import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Veiculo } from '../models/Veiculo';
import { VeiculoService } from './veiculo.service';

@Injectable()
export class VeiculoResolve implements Resolve<Veiculo> {

    constructor(private veiculoService: VeiculoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.veiculoService.obterPorId(route.params['id']);
    }
}