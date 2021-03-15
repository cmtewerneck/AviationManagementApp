import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Instrutor } from '../models/Instrutor';

@Injectable()
export class InstrutorService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(tipoColaborador: number): Observable<Instrutor[]> {
        return this.http
            .get<Instrutor[]>(this.urlServiceV1 + 'colaboradores/' + tipoColaborador, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Instrutor> {
        return this.http
            .get<Instrutor>(this.urlServiceV1 + 'colaboradores/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoInstrutor(instrutor: Instrutor): Observable<Instrutor> {
        return this.http
            .post(this.urlServiceV1 + 'colaboradores', instrutor, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarInstrutor(instrutor: Instrutor): Observable<Instrutor> {
        return this.http
            .put(this.urlServiceV1 + 'colaboradores/' + instrutor.id, instrutor, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirInstrutor(id: string): Observable<Instrutor> {
        return this.http
            .delete(this.urlServiceV1 + 'colaboradores/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
