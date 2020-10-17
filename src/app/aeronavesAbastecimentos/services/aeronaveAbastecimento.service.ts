import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Aeronave, AeronaveAbastecimento } from '../models/AeronaveAbastecimento';

@Injectable()
export class AeronaveAbastecimentoService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<AeronaveAbastecimento[]> {
        return this.http
            .get<AeronaveAbastecimento[]>(this.urlServiceV1 + 'aeronaves/abastecimentos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<AeronaveAbastecimento> {
        return this.http
            .get<AeronaveAbastecimento>(this.urlServiceV1 + 'aeronaves/abastecimentos/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novaAeronaveAbastecimento(aeronaveAbastecimento: AeronaveAbastecimento): Observable<AeronaveAbastecimento> {
        return this.http
            .post(this.urlServiceV1 + 'aeronaves/abastecimentos', aeronaveAbastecimento, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarAeronaveAbastecimento(aeronaveAbastecimento: AeronaveAbastecimento): Observable<AeronaveAbastecimento> {
        return this.http
            .put(this.urlServiceV1 + 'aeronaves/abastecimentos/' + aeronaveAbastecimento.id, aeronaveAbastecimento, 
                 this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirAeronaveAbastecimento(id: string): Observable<AeronaveAbastecimento> {
        return this.http
            .delete(this.urlServiceV1 + 'aeronaves/abastecimentos/' + id, this.ObterAuthHeaderJson())
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
