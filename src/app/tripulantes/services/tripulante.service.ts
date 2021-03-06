import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Tripulante } from '../models/Tripulante';

@Injectable()
export class TripulanteService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(tipoColaborador: number): Observable<Tripulante[]> {
        return this.http
            .get<Tripulante[]>(this.urlServiceV1 + 'colaboradores/' + tipoColaborador, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Tripulante> {
        return this.http
            .get<Tripulante>(this.urlServiceV1 + 'colaboradores/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoTripulante(tripulante: Tripulante): Observable<Tripulante> {
        return this.http
            .post(this.urlServiceV1 + 'colaboradores', tripulante, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarTripulante(tripulante: Tripulante): Observable<Tripulante> {
        return this.http
            .put(this.urlServiceV1 + 'colaboradores/' + tripulante.id, tripulante, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirTripulante(id: string): Observable<Tripulante> {
        return this.http
            .delete(this.urlServiceV1 + 'colaboradores/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
