import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CategoriaVoo } from '../models/CategoriaVoo';
import { CategoriaVooService } from './categoriaVoo.service';

@Injectable()
export class CategoriaVooResolve implements Resolve<CategoriaVoo> {

    constructor(private categoriaVooService: CategoriaVooService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.categoriaVooService.obterPorId(route.params['id']);
    }
}