import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { VooAgendado, Aeronave } from '../models/VooAgendado';

@Injectable()
export class VooAgendadoService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<VooAgendado[]> {
        return this.http
            .get<VooAgendado[]>(this.urlServiceV1 + 'voos-agendados', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<VooAgendado> {
        return this.http
            .get<VooAgendado>(this.urlServiceV1 + 'voos-agendados/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoVooAgendado(vooAgendado: VooAgendado): Observable<VooAgendado> {
        return this.http
            .post(this.urlServiceV1 + 'voos-agendados', vooAgendado, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarVooAgendado(vooAgendado: VooAgendado): Observable<VooAgendado> {
        return this.http
            .put(this.urlServiceV1 + 'voos-agendados/' + vooAgendado.id, vooAgendado, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirVooAgendado(id: string): Observable<VooAgendado> {
        return this.http
            .delete(this.urlServiceV1 + 'voos-agendados/' + id, this.ObterAuthHeaderJson())
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
