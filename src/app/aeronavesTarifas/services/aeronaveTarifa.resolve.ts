import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AeronaveTarifa } from '../mode../models/AeronaveTarifa
import { AeronaveTarifaService } from './aeronaveTarifa.service';

@Injectable()
export class AeronaveTarifaResolve implements Resolve<AeronaveTarifa> {

    constructor(private aeronaveTarifaService: AeronaveTarifaService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.aeronaveTarifaService.obterPorId(route.params['id']);
    }
}