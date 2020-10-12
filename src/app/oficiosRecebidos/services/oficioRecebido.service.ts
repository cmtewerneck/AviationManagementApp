import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { OficioRecebido } from '../models/OficioRecebido';

@Injectable()
export class OficioRecebidoService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<OficioRecebido[]> {
        return this.http
            .get<OficioRecebido[]>(this.urlServiceV1 + 'oficios-recebidos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<OficioRecebido> {
        return this.http
            .get<OficioRecebido>(this.urlServiceV1 + 'oficios-recebidos/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoOficioRecebido(oficioRecebido: OficioRecebido): Observable<OficioRecebido> {
        return this.http
            .post(this.urlServiceV1 + 'oficios-recebidos', oficioRecebido, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarOficioRecebido(oficioRecebido: OficioRecebido): Observable<OficioRecebido> {
        return this.http
            .put(this.urlServiceV1 + 'oficios-recebidos/' + oficioRecebido.id, oficioRecebido, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirOficioRecebido(id: string): Observable<OficioRecebido> {
        return this.http
            .delete(this.urlServiceV1 + 'oficios-recebidos/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
