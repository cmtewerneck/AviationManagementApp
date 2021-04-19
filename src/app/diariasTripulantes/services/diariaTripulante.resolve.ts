import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DiariaTripulante } from '../models/DiariaTripulante';
import { DiariaTripulanteService } from './diariaTripulante.service';

@Injectable()
export class DiariaTripulanteResolve implements Resolve<DiariaTripulante> {

    constructor(private diariaTripulanteService: DiariaTripulanteService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.diariaTripulanteService.obterPorId(route.params['id']);
    }
}