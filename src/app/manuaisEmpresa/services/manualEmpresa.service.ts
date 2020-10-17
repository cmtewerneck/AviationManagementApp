import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { ManualEmpresa } from '../models/ManualEmpresa';

@Injectable()
export class ManualEmpresaService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<ManualEmpresa[]> {
        return this.http
            .get<ManualEmpresa[]>(this.urlServiceV1 + 'manuais-empresa', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<ManualEmpresa> {
        return this.http
            .get<ManualEmpresa>(this.urlServiceV1 + 'manuais-empresa/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoManualEmpresa(manualEmpresa: ManualEmpresa): Observable<ManualEmpresa> {
        return this.http
            .post(this.urlServiceV1 + 'manuais-empresa', manualEmpresa, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarManualEmpresa(manualEmpresa: ManualEmpresa): Observable<ManualEmpresa> {
        return this.http
            .put(this.urlServiceV1 + 'manuais-empresa/' + manualEmpresa.id, manualEmpresa, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirManualEmpresa(id: string): Observable<ManualEmpresa> {
        return this.http
            .delete(this.urlServiceV1 + 'manuais-empresa/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
