import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Estoque } from '../models/estoque';

@Injectable()
export class EstoqueService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Estoque[]> {
        return this.http
            .get<Estoque[]>(this.urlServiceV1 + 'estoque', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Estoque> {
        return this.http
            .get<Estoque>(this.urlServiceV1 + 'estoque/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoEstoque(estoque: Estoque): Observable<Estoque> {
        return this.http
            .post(this.urlServiceV1 + 'estoque', estoque, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarEstoque(estoque: Estoque): Observable<Estoque> {
        return this.http
            .put(this.urlServiceV1 + 'estoque/' + estoque.id, estoque, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirEstoque(id: string): Observable<Estoque> {
        return this.http
            .delete(this.urlServiceV1 + 'estoque/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
