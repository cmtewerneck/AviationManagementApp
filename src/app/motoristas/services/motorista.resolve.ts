import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Motorista } from '../models/Motorista';
import { MotoristaService } from './motorista.service';

@Injectable()
export class MotoristaResolve implements Resolve<Motorista> {

    constructor(private motoristaService: MotoristaService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.motoristaService.obterPorId(route.params['id']);
    }
}