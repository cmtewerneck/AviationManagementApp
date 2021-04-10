import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Escala, Tripulante } from '../models/Escala';

@Injectable()
export class EscalaService extends BaseService {
    
    constructor(private http: HttpClient) { super() }
    
    obterTodos(): Observable<Escala[]> {
        return this.http
        .get<Escala[]>(this.urlServiceV1 + 'escalas', this.ObterAuthHeaderJson())
        .pipe(catchError(super.serviceError));
    }
    
    obterPorId(id: string): Observable<Escala> {
        return this.http
        .get<Escala>(this.urlServiceV1 + 'escalas/' + id, this.ObterAuthHeaderJson())
        .pipe(catchError(super.serviceError));
    }
    
    novaEscala(escala: Escala): Observable<Escala> {
        return this.http
        .post(this.urlServiceV1 + 'escalas', escala, this.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
        }
        
    atualizarEscala(escala: Escala): Observable<Escala> {
        return this.http
        .put(this.urlServiceV1 + 'escalas/' + escala.id, escala, this.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
        }
            
    excluirEscala(id: string): Observable<Escala> {
        return this.http
        .delete(this.urlServiceV1 + 'escalas/' + id, this.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
        }

    obterTripulantes(tipoColaborador: number): Observable<Tripulante[]> {
        return this.http
            .get<Tripulante[]>(this.urlServiceV1 + 'colaboradores/' + tipoColaborador, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }
}
            