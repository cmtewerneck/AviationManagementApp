import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { VooInstrucao } from '../models/VooInstrucao';
import { VooInstrucaoService } from './vooInstrucao.service';

@Injectable()
export class VooInstrucaoResolve implements Resolve<VooInstrucao> {

    constructor(private vooInstrucaoService: VooInstrucaoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.vooInstrucaoService.obterPorId(route.params['id']);
    }
}