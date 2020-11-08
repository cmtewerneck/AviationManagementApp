import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { ContasPagar } from '../models/ContasPagar';

@Injectable()
export class ContasPagarService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(): Observable<ContasPagar[]> {
        return this.http
            .get<ContasPagar[]>(this.urlServiceV1 + 'contas-pagar', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<ContasPagar> {
        return this.http
            .get<ContasPagar>(this.urlServiceV1 + 'contas-pagar/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoContasPagar(contasPagar: ContasPagar): Observable<ContasPagar> {
        return this.http
            .post(this.urlServiceV1 + 'contas-pagar', contasPagar, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarContasPagar(contasPagar: ContasPagar): Observable<ContasPagar> {
        return this.http
            .put(this.urlServiceV1 + 'contas-pagar/' + contasPagar.id, contasPagar, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirContasPagar(id: string): Observable<ContasPagar> {
        return this.http
            .delete(this.urlServiceV1 + 'contas-pagar/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
