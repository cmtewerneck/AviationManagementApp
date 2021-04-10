import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Rastreador } from '../models/Rastreador';
import { RastreadorService } from './rastreador.service';

@Injectable()
export class RastreadorResolve implements Resolve<Rastreador> {

    constructor(private rastreadorService: RastreadorService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.rastreadorService.obterPorId(route.params['id']);
    }
}