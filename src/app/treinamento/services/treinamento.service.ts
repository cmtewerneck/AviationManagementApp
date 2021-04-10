import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Treinamento, Tripulante, CategoriaTreinamento } from '../models/Treinamento';

@Injectable()
export class TreinamentoService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(): Observable<Treinamento[]> {
        return this.http
            .get<Treinamento[]>(this.urlServiceV1 + 'treinamentos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Treinamento> {
        return this.http
            .get<Treinamento>(this.urlServiceV1 + 'treinamentos/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoTreinamento(treinamento: Treinamento): Observable<Treinamento> {
        return this.http
            .post(this.urlServiceV1 + 'treinamentos', treinamento, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarTreinamento(treinamento: Treinamento): Observable<Treinamento> {
        return this.http
            .put(this.urlServiceV1 + 'treinamentos/' + treinamento.id, treinamento, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirTreinamento(id: string): Observable<Treinamento> {
        return this.http
            .delete(this.urlServiceV1 + 'treinamentos/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    obterTripulantes(tipoColaborador: number): Observable<Tripulante[]> {
        return this.http
            .get<Tripulante[]>(this.urlServiceV1 + 'colaboradores/' + tipoColaborador, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterCategorias(): Observable<CategoriaTreinamento[]> {
        return this.http
            .get<CategoriaTreinamento[]>(this.urlServiceV1 + 'categorias-treinamentos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    encerrarTreinamento(id: string): Observable<Treinamento> {
        return this.http
            .put(this.urlServiceV1 + 'treinamentos/encerrar/' + id, null, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    reabrirTreinamento(id: string): Observable<Treinamento> {
        return this.http
            .put(this.urlServiceV1 + 'treinamentos/reabrir/' + id, null, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
