import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Curso } from '../models/Curso';

@Injectable()
export class CursoService extends BaseService {
    
    constructor(private http: HttpClient) { super() }
    
    obterTodos(): Observable<Curso[]> {
        return this.http
        .get<Curso[]>(this.urlServiceV1 + 'cursos', this.ObterAuthHeaderJson())
        .pipe(catchError(super.serviceError));
    }
    
    obterPorId(id: string): Observable<Curso> {
        return this.http
        .get<Curso>(this.urlServiceV1 + 'cursos/' + id, this.ObterAuthHeaderJson())
        .pipe(catchError(super.serviceError));
    }
    
    novoCurso(curso: Curso): Observable<Curso> {
        return this.http
        .post(this.urlServiceV1 + 'cursos', curso, this.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
        }
        
        atualizarCurso(curso: Curso): Observable<Curso> {
            return this.http
            .put(this.urlServiceV1 + 'cursos/' + curso.id, curso, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
            }
            
            excluirCurso(id: string): Observable<Curso> {
                return this.http
                .delete(this.urlServiceV1 + 'cursos/' + id, this.ObterAuthHeaderJson())
                .pipe(
                    map(super.extractData),
                    catchError(super.serviceError));
                }
            }
            