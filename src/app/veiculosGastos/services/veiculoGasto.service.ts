import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Veiculo, VeiculoGasto } from '../models/veiculoGasto';

@Injectable()
export class VeiculoGastoService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<VeiculoGasto[]> {
        return this.http
            .get<VeiculoGasto[]>(this.urlServiceV1 + 'veiculos/gastos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<VeiculoGasto> {
        return this.http
            .get<VeiculoGasto>(this.urlServiceV1 + 'veiculos/gastos/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoVeiculoGasto(veiculoGasto: VeiculoGasto): Observable<VeiculoGasto> {
        return this.http
            .post(this.urlServiceV1 + 'veiculos/gastos', veiculoGasto, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarVeiculoGasto(veiculoGasto: VeiculoGasto): Observable<VeiculoGasto> {
        return this.http
            .put(this.urlServiceV1 + 'veiculos/gastos/' + veiculoGasto.id, veiculoGasto, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirVeiculoGasto(id: string): Observable<VeiculoGasto> {
        return this.http
            .delete(this.urlServiceV1 + 'veiculos/gastos/' + id, this.ObterAuthHeaderJson())
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
