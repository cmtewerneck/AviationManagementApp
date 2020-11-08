import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { VooAgendado } from '../models/VooAgendado';
import { VooAgendadoService } from './vooAgendado.service';

@Injectable()
export class VooAgendadoResolve implements Resolve<VooAgendado> {

    constructor(private vooAgendadoService: VooAgendadoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.vooAgendadoService.obterPorId(route.params['id']);
    }
}