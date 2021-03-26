import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Aeronave, OrdemServico } from '../models/OrdemServico';
import { Servico } from '../../servicos/models/Servico';

@Injectable()
export class OrdemServicoService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(): Observable<OrdemServico[]> {
        return this.http
            .get<OrdemServico[]>(this.urlServiceV1 + 'ordem-servico', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<OrdemServico> {
        return this.http
            .get<OrdemServico>(this.urlServiceV1 + 'ordem-servico/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoOrdemServico(ordemServico: OrdemServico): Observable<OrdemServico> {
        return this.http
            .post(this.urlServiceV1 + 'ordem-servico', ordemServico, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarOrdemServico(ordemServico: OrdemServico): Observable<OrdemServico> {
        return this.http
            .put(this.urlServiceV1 + 'ordem-servico/' + ordemServico.id, ordemServico, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirOrdemServico(id: string): Observable<OrdemServico> {
        return this.http
            .delete(this.urlServiceV1 + 'ordem-servico/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    obterAeronaves(): Observable<Aeronave[]> {
        return this.http
            .get<Aeronave[]>(this.urlServiceV1 + 'aeronaves', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterServicos(): Observable<Servico[]> {
        return this.http
            .get<Servico[]>(this.urlServiceV1 + 'servicos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }
}
