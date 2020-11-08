import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { ContasReceber } from '../models/ContasReceber';

@Injectable()
export class ContasReceberService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(): Observable<ContasReceber[]> {
        return this.http
            .get<ContasReceber[]>(this.urlServiceV1 + 'contas-receber', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<ContasReceber> {
        return this.http
            .get<ContasReceber>(this.urlServiceV1 + 'contas-receber/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoContasReceber(contasReceber: ContasReceber): Observable<ContasReceber> {
        return this.http
            .post(this.urlServiceV1 + 'contas-receber', contasReceber, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarContasReceber(contasReceber: ContasReceber): Observable<ContasReceber> {
        return this.http
            .put(this.urlServiceV1 + 'contas-receber/' + contasReceber.id, contasReceber, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirContasReceber(id: string): Observable<ContasReceber> {
        return this.http
            .delete(this.urlServiceV1 + 'contas-receber/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
