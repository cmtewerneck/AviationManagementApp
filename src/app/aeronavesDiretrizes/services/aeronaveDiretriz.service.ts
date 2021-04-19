import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Aeronave, AeronaveDiretriz } from '../models/AeronaveDiretriz';

@Injectable()
export class AeronaveDiretrizService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<AeronaveDiretriz[]> {
        return this.http
            .get<AeronaveDiretriz[]>(this.urlServiceV1 + 'aeronaves/diretrizes', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<AeronaveDiretriz> {
        return this.http
            .get<AeronaveDiretriz>(this.urlServiceV1 + 'aeronaves/diretrizes/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novaAeronaveDiretriz(aeronaveDiretriz: AeronaveDiretriz): Observable<AeronaveDiretriz> {
        return this.http
            .post(this.urlServiceV1 + 'aeronaves/diretrizes', aeronaveDiretriz, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarAeronaveDiretriz(aeronaveDiretriz: AeronaveDiretriz): Observable<AeronaveDiretriz> {
        return this.http
            .put(this.urlServiceV1 + 'aeronaves/diretrizes/' + aeronaveDiretriz.id, aeronaveDiretriz, 
                 this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirAeronaveDiretriz(id: string): Observable<AeronaveDiretriz> {
        return this.http
            .delete(this.urlServiceV1 + 'aeronaves/diretrizes/' + id, this.ObterAuthHeaderJson())
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
