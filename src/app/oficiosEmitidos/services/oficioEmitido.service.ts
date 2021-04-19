import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { OficioEmitido } from '../models/OficioEmitido';
import { OficioEmitidoPaged } from '../models/OficioEmitidoPaged';

@Injectable()
export class OficioEmitidoService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<OficioEmitido[]> {
        return this.http
            .get<OficioEmitido[]>(this.urlServiceV1 + 'oficios-emitidos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterTodosPaginados(ps: number, page: number, query: string): Observable<OficioEmitidoPaged[]> {
        return this.http
            .get<OficioEmitidoPaged[]>(this.urlServiceV1 + `oficios-emitidos?ps=${ps}&page=${page}&query=${query}`, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<OficioEmitido> {
        return this.http
            .get<OficioEmitido>(this.urlServiceV1 + 'oficios-emitidos/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoOficioEmitido(oficioEmitido: OficioEmitido): Observable<OficioEmitido> {
        return this.http
            .post(this.urlServiceV1 + 'oficios-emitidos', oficioEmitido, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarOficioEmitido(oficioEmitido: OficioEmitido): Observable<OficioEmitido> {
        return this.http
            .put(this.urlServiceV1 + 'oficios-emitidos/' + oficioEmitido.id, oficioEmitido, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirOficioEmitido(id: string): Observable<OficioEmitido> {
        return this.http
            .delete(this.urlServiceV1 + 'oficios-emitidos/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
