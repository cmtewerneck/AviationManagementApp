import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Mecanico } from '../models/Mecanico';
import { MecanicoService } from '../services/mecanico.service';

@Injectable()
export class MecanicoResolve implements Resolve<Mecanico> {

    constructor(private mecanicoService: MecanicoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.mecanicoService.obterPorId(route.params['id']);
    }
}