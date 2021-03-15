import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Motorista } from '../models/Motorista';

@Injectable()
export class MotoristaService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(tipoColaborador: number): Observable<Motorista[]> {
        return this.http
            .get<Motorista[]>(this.urlServiceV1 + 'colaboradores/' + tipoColaborador, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Motorista> {
        return this.http
            .get<Motorista>(this.urlServiceV1 + 'colaboradores/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoMotorista(motorista: Motorista): Observable<Motorista> {
        return this.http
            .post(this.urlServiceV1 + 'colaboradores', motorista, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarMotorista(motorista: Motorista): Observable<Motorista> {
        return this.http
            .put(this.urlServiceV1 + 'colaboradores/' + motorista.id, motorista, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirMotorista(id: string): Observable<Motorista> {
        return this.http
            .delete(this.urlServiceV1 + 'colaboradores/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
