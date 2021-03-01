import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Suprimento } from '../models/Suprimento';

@Injectable()
export class SuprimentoService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Suprimento[]> {
        return this.http
            .get<Suprimento[]>(this.urlServiceV1 + 'suprimentos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Suprimento> {
        return this.http
            .get<Suprimento>(this.urlServiceV1 + 'suprimentos/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoSuprimento(suprimento: Suprimento): Observable<Suprimento> {
        return this.http
            .post(this.urlServiceV1 + 'suprimentos', suprimento, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarSuprimento(suprimento: Suprimento): Observable<Suprimento> {
        return this.http
            .put(this.urlServiceV1 + 'suprimentos/' + suprimento.id, suprimento, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirSuprimento(id: string): Observable<Suprimento> {
        return this.http
            .delete(this.urlServiceV1 + 'suprimentos/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
