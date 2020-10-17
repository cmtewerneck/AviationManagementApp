import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ManualEmpresa } from '../models/ManualEmpresa';
import { ManualEmpresaService } from './manualEmpresa.service';

@Injectable()
export class ManualEmpresaResolve implements Resolve<ManualEmpresa> {

    constructor(private manualEmpresaService: ManualEmpresaService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.manualEmpresaService.obterPorId(route.params['id']);
    }
}