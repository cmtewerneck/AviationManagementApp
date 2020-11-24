import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Servico } from '../models/Servico';
import { ServicoService } from './servico.service';

@Injectable()
export class ServicoResolve implements Resolve<Servico> {

    constructor(private servicoService: ServicoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.servicoService.obterPorId(route.params['id']);
    }
}