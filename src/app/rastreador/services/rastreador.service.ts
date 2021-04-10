import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Aeronave, Rastreador } from '../models/Rastreador';

@Injectable()
export class RastreadorService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Rastreador[]> {
        return this.http
            .get<Rastreador[]>(this.urlServiceV1 + 'rastreadores', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Rastreador> {
        return this.http
            .get<Rastreador>(this.urlServiceV1 + 'rastreadores/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoRastreador(rastreador: Rastreador): Observable<Rastreador> {
        return this.http
            .post(this.urlServiceV1 + 'rastreadores', rastreador, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarRastreador(rastreador: Rastreador): Observable<Rastreador> {
        return this.http
            .put(this.urlServiceV1 + 'rastreadores/' + rastreador.id, rastreador, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirRastreador(id: string): Observable<Rastreador> {
        return this.http
            .delete(this.urlServiceV1 + 'rastreadores/' + id, this.ObterAuthHeaderJson())
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
