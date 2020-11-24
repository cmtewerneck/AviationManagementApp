import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Servico } from '../models/Servico';

@Injectable()
export class ServicoService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(): Observable<Servico[]> {
        return this.http
            .get<Servico[]>(this.urlServiceV1 + 'servicos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Servico> {
        return this.http
            .get<Servico>(this.urlServiceV1 + 'servicos/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoServico(servico: Servico): Observable<Servico> {
        return this.http
            .post(this.urlServiceV1 + 'servicos', servico, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarServico(servico: Servico): Observable<Servico> {
        return this.http
            .put(this.urlServiceV1 + 'servicos/' + servico.id, servico, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirServico(id: string): Observable<Servico> {
        return this.http
            .delete(this.urlServiceV1 + 'servicos/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
