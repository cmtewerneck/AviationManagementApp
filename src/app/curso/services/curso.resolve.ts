import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Curso } from '../models/Curso';
import { CursoService } from './curso.service';

@Injectable()
export class CursoResolve implements Resolve<Curso> {
    
    constructor(private cursoService: CursoService) { }
    
    resolve(route: ActivatedRouteSnapshot) {
        return this.cursoService.obterPorId(route.params['id']);
    }
}