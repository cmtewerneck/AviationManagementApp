import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Veiculo, VeiculoMulta } from '../models/veiculoMulta';

@Injectable()
export class VeiculoMultaService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<VeiculoMulta[]> {
        return this.http
            .get<VeiculoMulta[]>(this.urlServiceV1 + 'veiculos/multas', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<VeiculoMulta> {
        return this.http
            .get<VeiculoMulta>(this.urlServiceV1 + 'veiculos/multas/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoVeiculoMulta(veiculoMulta: VeiculoMulta): Observable<VeiculoMulta> {
        return this.http
            .post(this.urlServiceV1 + 'veiculos/multas', veiculoMulta, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarVeiculoMulta(veiculoMulta: VeiculoMulta): Observable<VeiculoMulta> {
        return this.http
            .put(this.urlServiceV1 + 'veiculos/multas/' + veiculoMulta.id, veiculoMulta, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirVeiculoMulta(id: string): Observable<VeiculoMulta> {
        return this.http
            .delete(this.urlServiceV1 + 'veiculos/multas/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    obterVeiculos(): Observable<Veiculo[]> {
        return this.http
            .get<Veiculo[]>(this.urlServiceV1 + 'veiculos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }
}
