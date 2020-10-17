import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Aeronave, AeronaveTarifa } from '../models/AeronaveTarifa';

@Injectable()
export class AeronaveTarifaService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<AeronaveTarifa[]> {
        return this.http
            .get<AeronaveTarifa[]>(this.urlServiceV1 + 'aeronaves/tarifas', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<AeronaveTarifa> {
        return this.http
            .get<AeronaveTarifa>(this.urlServiceV1 + 'aeronaves/tarifas/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novaAeronaveTarifa(aeronaveTarifa: AeronaveTarifa): Observable<AeronaveTarifa> {
        return this.http
            .post(this.urlServiceV1 + 'aeronaves/tarifas', aeronaveTarifa, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarAeronaveTarifa(aeronaveTarifa: AeronaveTarifa): Observable<AeronaveTarifa> {
        return this.http
            .put(this.urlServiceV1 + 'aeronaves/tarifas/' + aeronaveTarifa.id, aeronaveTarifa, 
                 this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirAeronaveTarifa(id: string): Observable<AeronaveTarifa> {
        return this.http
            .delete(this.urlServiceV1 + 'aeronaves/tarifas/' + id, this.ObterAuthHeaderJson())
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
