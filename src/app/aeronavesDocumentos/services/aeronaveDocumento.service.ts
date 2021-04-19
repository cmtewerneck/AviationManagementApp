import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Aeronave, AeronaveDocumento } from '../models/AeronaveDocumento';

@Injectable()
export class AeronaveDocumentoService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<AeronaveDocumento[]> {
        return this.http
            .get<AeronaveDocumento[]>(this.urlServiceV1 + 'aeronaves/documentos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<AeronaveDocumento> {
        return this.http
            .get<AeronaveDocumento>(this.urlServiceV1 + 'aeronaves/documentos/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novaAeronaveDocumento(aeronaveDocumento: AeronaveDocumento): Observable<AeronaveDocumento> {
        return this.http
            .post(this.urlServiceV1 + 'aeronaves/documentos', aeronaveDocumento, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarAeronaveDocumento(aeronaveDocumento: AeronaveDocumento): Observable<AeronaveDocumento> {
        return this.http
            .put(this.urlServiceV1 + 'aeronaves/documentos/' + aeronaveDocumento.id, aeronaveDocumento, 
                 this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirAeronaveDocumento(id: string): Observable<AeronaveDocumento> {
        return this.http
            .delete(this.urlServiceV1 + 'aeronaves/documentos/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    obterAeronaves(): Observable<Aeronave[]> {
        return this.http
            .get<Aeronave[]>(this.urlServiceV1 + 'aeronaves', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }
}
