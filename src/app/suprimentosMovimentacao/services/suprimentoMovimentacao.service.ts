import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { SuprimentoMovimentacao, Suprimento, SuprimentoQuantidade } from '../models/SuprimentoMovimentacao';

@Injectable()
export class SuprimentoMovimentacaoService extends BaseService {
    
    constructor(private http: HttpClient) { super() }
    
    obterTodos(): Observable<SuprimentoMovimentacao[]> {
        return this.http
        .get<SuprimentoMovimentacao[]>(this.urlServiceV1 + 'suprimentos/movimentacoes', this.ObterAuthHeaderJson())
        .pipe(catchError(super.serviceError));
    }
    
    obterPorId(id: string): Observable<SuprimentoMovimentacao> {
        return this.http
        .get<SuprimentoMovimentacao>(this.urlServiceV1 + 'suprimentos/movimentacoes/' + id, this.ObterAuthHeaderJson())
        .pipe(catchError(super.serviceError));
    }
    
    novoSuprimentoMovimentacao(suprimentoMovimentacao: SuprimentoMovimentacao): Observable<SuprimentoMovimentacao> {
        return this.http
        .post(this.urlServiceV1 + 'suprimentos/movimentacoes', suprimentoMovimentacao, this.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
        }
        
    atualizarSuprimentoMovimentacao(suprimentoMovimentacao: SuprimentoMovimentacao): Observable<SuprimentoMovimentacao> {
        return this.http
        .put(this.urlServiceV1 + 'suprimentos/movimentacoes/' + suprimentoMovimentacao.id, suprimentoMovimentacao, this.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
        }
            
    excluirSuprimentoMovimentacao(id: string): Observable<SuprimentoMovimentacao> {
        return this.http
        .delete(this.urlServiceV1 + 'suprimentos/movimentacoes/' + id, this.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
        }
                
    obterSuprimentos(): Observable<Suprimento[]> {
        return this.http
        .get<Suprimento[]>(this.urlServiceV1 + 'suprimentos', this.ObterAuthHeaderJson())
        .pipe(catchError(super.serviceError));
    }

    atualizarSuprimentoQuantidade(suprimentoQuantidade: SuprimentoQuantidade, tipoMovimentacao: number): Observable<SuprimentoQuantidade> {
        return this.http
        .put(this.urlServiceV1 + 'suprimentos/entrada/' + suprimentoQuantidade.id + '/' + tipoMovimentacao, suprimentoQuantidade, this.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
        }
}