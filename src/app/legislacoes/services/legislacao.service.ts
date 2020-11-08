import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Legislacao } from '../models/Legislacao';

@Injectable()
export class LegislacaoService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(): Observable<Legislacao[]> {
        return this.http
            .get<Legislacao[]>(this.urlServiceV1 + 'legislacoes', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Legislacao> {
        return this.http
            .get<Legislacao>(this.urlServiceV1 + 'legislacoes/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoLegislacao(legislacao: Legislacao): Observable<Legislacao> {
        return this.http
            .post(this.urlServiceV1 + 'legislacoes', legislacao, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarLegislacao(legislacao: Legislacao): Observable<Legislacao> {
        return this.http
            .put(this.urlServiceV1 + 'legislacoes/' + legislacao.id, legislacao, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirLegislacao(id: string): Observable<Legislacao> {
        return this.http
            .delete(this.urlServiceV1 + 'legislacoes/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
