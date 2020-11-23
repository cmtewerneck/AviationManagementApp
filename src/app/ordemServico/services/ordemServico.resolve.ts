import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OrdemServico } from '../models/OrdemServico';
import { OrdemServicoService } from './ordemServico.service';

@Injectable()
export class OrdemServicoResolve implements Resolve<OrdemServico> {

    constructor(private ordemServicoService: OrdemServicoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.ordemServicoService.obterPorId(route.params['id']);
    }
}