import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Aeronave } from '../models/Aeronave';

@Injectable()
export class AeronaveService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Aeronave[]> {
        return this.http
            .get<Aeronave[]>(this.urlServiceV1 + 'aeronaves', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterQuantidadeAeronavesCadastradas(): Observable<number> {
        return this.http
            .get<number>(this.urlServiceV1 + 'aeronaves/quantidade', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Aeronave> {
        return this.http
            .get<Aeronave>(this.urlServiceV1 + 'aeronaves/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novaAeronave(aeronave: Aeronave): Observable<Aeronave> {
        return this.http
            .post(this.urlServiceV1 + 'aeronaves', aeronave, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarAeronave(aeronave: Aeronave): Observable<Aeronave> {
        return this.http
            .put(this.urlServiceV1 + 'aeronaves/' + aeronave.id, aeronave, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirAeronave(id: string): Observable<Aeronave> {
        return this.http
            .delete(this.urlServiceV1 + 'aeronaves/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    liberarAeronave(id: string): Observable<Aeronave> {
        return this.http
            .put(this.urlServiceV1 + 'aeronaves/liberar/' + id, null, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    pararAeronave(id: string): Observable<Aeronave> {
        return this.http
            .put(this.urlServiceV1 + 'aeronaves/parar/' + id, null, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
