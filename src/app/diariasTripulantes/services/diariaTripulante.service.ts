import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { DiariaTripulante, Tripulante } from '../models/DiariaTripulante';

@Injectable()
export class DiariaTripulanteService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(): Observable<DiariaTripulante[]> {
        return this.http
            .get<DiariaTripulante[]>(this.urlServiceV1 + 'diarias-tripulantes', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<DiariaTripulante> {
        return this.http
            .get<DiariaTripulante>(this.urlServiceV1 + 'diarias-tripulantes/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novaDiariaTripulante(diariaTripulante: DiariaTripulante): Observable<DiariaTripulante> {
        return this.http
            .post(this.urlServiceV1 + 'diarias-tripulantes', diariaTripulante, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarDiariaTripulante(diariaTripulante: DiariaTripulante): Observable<DiariaTripulante> {
        return this.http
            .put(this.urlServiceV1 + 'diarias-tripulantes/' + diariaTripulante.id, diariaTripulante, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirDiariaTripulante(id: string): Observable<DiariaTripulante> {
        return this.http
            .delete(this.urlServiceV1 + 'diarias-tripulantes/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    obterColaboradores(tipoColaborador: number): Observable<Tripulante[]> {
        return this.http
            .get<Tripulante[]>(this.urlServiceV1 + 'colaboradores/' + tipoColaborador, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }
}
