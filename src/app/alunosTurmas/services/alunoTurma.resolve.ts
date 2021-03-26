import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AlunoTurma } from '../models/AlunoTurma';
import { AlunoTurmaService } from './alunoTurma.service';

@Injectable()
export class AlunoTurmaResolve implements Resolve<AlunoTurma> {

    constructor(private alunoTurmaService: AlunoTurmaService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.alunoTurmaService.obterPorId(route.params['id']);
    }
}