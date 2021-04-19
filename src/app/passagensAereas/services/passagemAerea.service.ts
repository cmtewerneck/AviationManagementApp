import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { PassagemAerea } from '../models/PassagemAerea';
import { Colaborador } from '../models/Colaborador';

@Injectable()
export class PassagemAereaService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(): Observable<PassagemAerea[]> {
        return this.http
            .get<PassagemAerea[]>(this.urlServiceV1 + 'passagens-aereas', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<PassagemAerea> {
        return this.http
            .get<PassagemAerea>(this.urlServiceV1 + 'passagens-aereas/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novaPassagemAerea(passagemAerea: PassagemAerea): Observable<PassagemAerea> {
        return this.http
            .post(this.urlServiceV1 + 'passagens-aereas', passagemAerea, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarPassagemAerea(passagemAerea: PassagemAerea): Observable<PassagemAerea> {
        return this.http
            .put(this.urlServiceV1 + 'passagens-aereas/' + passagemAerea.id, passagemAerea, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirPassagemAerea(id: string): Observable<PassagemAerea> {
        return this.http
            .delete(this.urlServiceV1 + 'passagens-aereas/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    obterColaboradores(): Observable<Colaborador[]> {
        return this.http
            .get<Colaborador[]>(this.urlServiceV1 + 'colaboradores/aeronautas', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }
}
