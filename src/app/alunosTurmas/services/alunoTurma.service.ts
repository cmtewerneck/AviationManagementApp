import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Turma, Aluno, AlunoTurma } from '../models/AlunoTurma';

@Injectable()
export class AlunoTurmaService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(): Observable<AlunoTurma[]> {
        return this.http
            .get<AlunoTurma[]>(this.urlServiceV1 + 'turmas/alunos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<AlunoTurma> {
        return this.http
            .get<AlunoTurma>(this.urlServiceV1 + 'turmas/aluno' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novaAlunoTurma(alunoTurma: AlunoTurma): Observable<AlunoTurma> {
        return this.http
            .post(this.urlServiceV1 + 'turmas/alunos', alunoTurma, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarAlunoTurma(alunoTurma: AlunoTurma): Observable<AlunoTurma> {
        return this.http
            .put(this.urlServiceV1 + 'turmas/alunos' + alunoTurma.id, alunoTurma, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirAlunoTurma(id: string): Observable<AlunoTurma> {
        return this.http
            .delete(this.urlServiceV1 + 'turmas/alunos' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    obterTurmas(): Observable<Turma[]> {
        return this.http
            .get<Turma[]>(this.urlServiceV1 + 'turmas', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterAlunos(): Observable<Aluno[]> {
        return this.http
            .get<Aluno[]>(this.urlServiceV1 + 'alunos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }
}
