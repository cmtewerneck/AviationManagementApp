import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Curso, Turma } from '../models/Turma';

@Injectable()
export class TurmaService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(): Observable<Turma[]> {
        return this.http
            .get<Turma[]>(this.urlServiceV1 + 'turmas', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Turma> {
        return this.http
            .get<Turma>(this.urlServiceV1 + 'turmas/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novaTurma(turma: Turma): Observable<Turma> {
        return this.http
            .post(this.urlServiceV1 + 'turmas', turma, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarTurma(turma: Turma): Observable<Turma> {
        return this.http
            .put(this.urlServiceV1 + 'turmas/' + turma.id, turma, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirTurma(id: string): Observable<Turma> {
        return this.http
            .delete(this.urlServiceV1 + 'turmas/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    obterCursos(): Observable<Curso[]> {
        return this.http
            .get<Curso[]>(this.urlServiceV1 + 'cursos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }
}
