import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Aeronave, AeronaveMotor } from '../models/AeronaveMotor';

@Injectable()
export class AeronaveMotorService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<AeronaveMotor[]> {
        return this.http
            .get<AeronaveMotor[]>(this.urlServiceV1 + 'aeronaves/motores', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<AeronaveMotor> {
        return this.http
            .get<AeronaveMotor>(this.urlServiceV1 + 'aeronaves/motores/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novaAeronaveMotor(aeronaveMotor: AeronaveMotor): Observable<AeronaveMotor> {
        return this.http
            .post(this.urlServiceV1 + 'aeronaves/motores', aeronaveMotor, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarAeronaveMotor(aeronaveMotor: AeronaveMotor): Observable<AeronaveMotor> {
        return this.http
            .put(this.urlServiceV1 + 'aeronaves/motores/' + aeronaveMotor.id, aeronaveMotor, 
                 this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirAeronaveMotor(id: string): Observable<AeronaveMotor> {
        return this.http
            .delete(this.urlServiceV1 + 'aeronaves/motores/' + id, this.ObterAuthHeaderJson())
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
