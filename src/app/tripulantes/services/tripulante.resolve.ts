import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Tripulante } from '../models/Tripulante';
import { TripulanteService } from './tripulante.service';

@Injectable()
export class TripulanteResolve implements Resolve<Tripulante> {

    constructor(private tripulanteService: TripulanteService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.tripulanteService.obterPorId(route.params['id']);
    }
}