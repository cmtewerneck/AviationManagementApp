import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Aeronave, DiarioBordo, Tripulante } from '../models/DiarioBordo';

@Injectable()
export class DiarioBordoService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(): Observable<DiarioBordo[]> {
        return this.http
            .get<DiarioBordo[]>(this.urlServiceV1 + 'diarios-bordo', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<DiarioBordo> {
        return this.http
            .get<DiarioBordo>(this.urlServiceV1 + 'diarios-bordo/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoDiarioBordo(diarioBordo: DiarioBordo): Observable<DiarioBordo> {
        return this.http
            .post(this.urlServiceV1 + 'diarios-bordo', diarioBordo, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarDiarioBordo(diarioBordo: DiarioBordo): Observable<DiarioBordo> {
        return this.http
            .put(this.urlServiceV1 + 'diarios-bordo/' + diarioBordo.id, diarioBordo, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirDiarioBordo(id: string): Observable<DiarioBordo> {
        return this.http
            .delete(this.urlServiceV1 + 'diarios-bordo/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    obterAeronaves(): Observable<Aeronave[]> {
        return this.http
            .get<Aeronave[]>(this.urlServiceV1 + 'aeronaves', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterColaboradores(): Observable<Tripulante[]> {
        return this.http
            .get<Tripulante[]>(this.urlServiceV1 + 'colaboradores', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }
}
