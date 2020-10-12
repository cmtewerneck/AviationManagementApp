import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Veiculo } from '../models/veiculo';

@Injectable()
export class VeiculoService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(): Observable<Veiculo[]> {
        return this.http
            .get<Veiculo[]>(this.urlServiceV1 + 'veiculos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Veiculo> {
        return this.http
            .get<Veiculo>(this.urlServiceV1 + 'veiculos/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoVeiculo(veiculo: Veiculo): Observable<Veiculo> {
        return this.http
            .post(this.urlServiceV1 + 'veiculos', veiculo, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarVeiculo(veiculo: Veiculo): Observable<Veiculo> {
        return this.http
            .put(this.urlServiceV1 + 'veiculos/' + veiculo.id, veiculo, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirVeiculo(id: string): Observable<Veiculo> {
        return this.http
            .delete(this.urlServiceV1 + 'veiculos/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
