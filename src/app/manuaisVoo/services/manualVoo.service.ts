import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { ManualVoo } from '../models/ManualVoo';

@Injectable()
export class ManualVooService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(): Observable<ManualVoo[]> {
        return this.http
            .get<ManualVoo[]>(this.urlServiceV1 + 'manuais-voo', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<ManualVoo> {
        return this.http
            .get<ManualVoo>(this.urlServiceV1 + 'manuais-voo/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoManualVoo(manualVoo: ManualVoo): Observable<ManualVoo> {
        return this.http
            .post(this.urlServiceV1 + 'manuais-voo', manualVoo, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarManualVoo(manualVoo: ManualVoo): Observable<ManualVoo> {
        return this.http
            .put(this.urlServiceV1 + 'manuais-voo/' + manualVoo.id, manualVoo, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirManualVoo(id: string): Observable<ManualVoo> {
        return this.http
            .delete(this.urlServiceV1 + 'manuais-voo/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
