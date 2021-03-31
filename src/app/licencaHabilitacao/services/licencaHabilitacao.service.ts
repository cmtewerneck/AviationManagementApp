import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Colaborador, LicencaHabilitacao } from '../models/LicencaHabilitacao';

@Injectable()
export class LicencaHabilitacaoService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(): Observable<LicencaHabilitacao[]> {
        return this.http
            .get<LicencaHabilitacao[]>(this.urlServiceV1 + 'licencas-habilitacoes', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<LicencaHabilitacao> {
        return this.http
            .get<LicencaHabilitacao>(this.urlServiceV1 + 'licencas-habilitacoes/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novaLicencaHabilitacao(licencaHabilitacao: LicencaHabilitacao): Observable<LicencaHabilitacao> {
        return this.http
            .post(this.urlServiceV1 + 'licencas-habilitacoes', licencaHabilitacao, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarLicencaHabilitacao(licencaHabilitacao: LicencaHabilitacao): Observable<LicencaHabilitacao> {
        return this.http
            .put(this.urlServiceV1 + 'licencas-habilitacoes/' + licencaHabilitacao.id, licencaHabilitacao, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirLicencaHabilitacao(id: string): Observable<LicencaHabilitacao> {
        return this.http
            .delete(this.urlServiceV1 + 'licencas-habilitacoes/' + id, this.ObterAuthHeaderJson())
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
