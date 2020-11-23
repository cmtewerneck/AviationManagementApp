import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Mecanico } from '../models/Mecanico';

@Injectable()
export class MecanicoService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(): Observable<Mecanico[]> {
        return this.http
            .get<Mecanico[]>(this.urlServiceV1 + 'mecanicos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Mecanico> {
        return this.http
            .get<Mecanico>(this.urlServiceV1 + 'mecanicos/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoMecanico(mecanico: Mecanico): Observable<Mecanico> {
        return this.http
            .post(this.urlServiceV1 + 'mecanicos', mecanico, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarMecanico(mecanico: Mecanico): Observable<Mecanico> {
        return this.http
            .put(this.urlServiceV1 + 'mecanicos/' + mecanico.id, mecanico, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirMecanico(id: string): Observable<Mecanico> {
        return this.http
            .delete(this.urlServiceV1 + 'mecanicos/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
