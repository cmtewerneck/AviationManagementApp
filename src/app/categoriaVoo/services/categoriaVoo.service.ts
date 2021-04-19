import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { CategoriaVoo } from '../models/CategoriaVoo';

@Injectable()
export class CategoriaVooService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(): Observable<CategoriaVoo[]> {
        return this.http
            .get<CategoriaVoo[]>(this.urlServiceV1 + 'categorias-voos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<CategoriaVoo> {
        return this.http
            .get<CategoriaVoo>(this.urlServiceV1 + 'categorias-voos/' + id, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novaCategoriaVoo(categoriaVoo: CategoriaVoo): Observable<CategoriaVoo> {
        return this.http
            .post(this.urlServiceV1 + 'categorias-voos', categoriaVoo, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarCategoriaVoo(categoriaVoo: CategoriaVoo): Observable<CategoriaVoo> {
        return this.http
            .put(this.urlServiceV1 + 'categorias-voos/' + categoriaVoo.id, categoriaVoo, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirCategoriaVoo(id: string): Observable<CategoriaVoo> {
        return this.http
            .delete(this.urlServiceV1 + 'categorias-voos/' + id, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
    
}
