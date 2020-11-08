import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DiarioBordo } from '../models/DiarioBordo';
import { DiarioBordoService } from './diarioBordo.service';

@Injectable()
export class DiarioBordoResolve implements Resolve<DiarioBordo> {

    constructor(private diarioBordoService: DiarioBordoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.diarioBordoService.obterPorId(route.params['id']);
    }
}