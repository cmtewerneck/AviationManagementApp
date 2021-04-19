import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PassagemAerea } from '../models/PassagemAerea';
import { PassagemAereaService } from './passagemAerea.service';

@Injectable()
export class PassagemAereaResolve implements Resolve<PassagemAerea> {

    constructor(private passagemAereaService: PassagemAereaService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.passagemAereaService.obterPorId(route.params['id']);
    }
}