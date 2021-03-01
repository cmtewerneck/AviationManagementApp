import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Aluno } from '../models/Aluno';
import { AlunoService } from './aluno.service';

@Injectable()
export class AlunoResolve implements Resolve<Aluno> {

    constructor(private alunoService: AlunoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.alunoService.ObterPorId(route.params['id']);
    }
}