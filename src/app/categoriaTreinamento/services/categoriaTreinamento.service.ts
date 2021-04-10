import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { CategoriaTreinamento } from '../models/CategoriaTreinamento';

@Injectable()
export class CategoriaTreinamentoService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(): Observable<CategoriaTreinamento[]> {
        return this.http
            .get<CategoriaTreinamento[]>(this.urlServiceV1 + 'categorias-treinamentos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<CategoriaTreinamento> {
        return this.http
            .get<CategoriaTreinamento>(this.urlServiceV1 + 'categorias-treinamentos/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novaCategoriaTreinamento(categoriaTreinamento: CategoriaTreinamento): Observable<CategoriaTreinamento> {
        return this.http
            .post(this.urlServiceV1 + 'categorias-treinamentos', categoriaTreinamento, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarCategoriaTreinamento(categoriaTreinamento: CategoriaTreinamento): Observable<CategoriaTreinamento> {
        return this.http
            .put(this.urlServiceV1 + 'categorias-treinamentos/' + categoriaTreinamento.id, categoriaTreinamento, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirCategoriaTreinamento(id: string): Observable<CategoriaTreinamento> {
        return this.http
            .delete(this.urlServiceV1 + 'categorias-treinamentos/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
    
}
