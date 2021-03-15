import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../_services/base.service';
import { Aeronave, VooInstrucao, Instrutor, Aluno } from '../models/VooInstrucao';

@Injectable()
export class VooInstrucaoService extends BaseService {
    
    constructor(private http: HttpClient) { super(); }
    
    obterTodos(): Observable<VooInstrucao[]> {
        return this.http
        .get<VooInstrucao[]>(this.urlServiceV1 + 'voos-instrucao', this.ObterAuthHeaderJson())
        .pipe(catchError(super.serviceError));
    }
    
    obterPorId(id: string): Observable<VooInstrucao> {
        return this.http
        .get<VooInstrucao>(this.urlServiceV1 + 'voos-instrucao/' + id, this.ObterAuthHeaderJson())
        .pipe(catchError(super.serviceError));
    }
    
    novoVooInstrucao(vooInstrucao: VooInstrucao): Observable<VooInstrucao> {
        return this.http
        .post(this.urlServiceV1 + 'voos-instrucao', vooInstrucao, this.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
        }
        
        atualizarVooInstrucao(vooInstrucao: VooInstrucao): Observable<VooInstrucao> {
            return this.http
            .put(this.urlServiceV1 + 'voos-instrucao/' + vooInstrucao.id, vooInstrucao, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
            }
            
            excluirVooInstrucao(id: string): Observable<VooInstrucao> {
                return this.http
                .delete(this.urlServiceV1 + 'voos-instrucao/' + id, this.ObterAuthHeaderJson())
                .pipe(
                    map(super.extractData),
                    catchError(super.serviceError));
                }
                
                obterAeronaves(): Observable<Aeronave[]> {
                    return this.http
                    .get<Aeronave[]>(this.urlServiceV1 + 'aeronaves', this.ObterAuthHeaderJson())
                    .pipe(catchError(super.serviceError));
                }
                
                // IMPLEMENTAR PARA BUSCAR SOMENTE OS DE ENUM 3 (INSTRUTOR)
                obterInstrutores(tipoColaborador: number): Observable<Instrutor[]> {
                    return this.http
                    .get<Instrutor[]>(this.urlServiceV1 + 'colaboradores/' + tipoColaborador, this.ObterAuthHeaderJson())
                    .pipe(catchError(super.serviceError));
                }
                
                obterAlunos(): Observable<Aluno[]> {
                    return this.http
                    .get<Aluno[]>(this.urlServiceV1 + 'alunos', this.ObterAuthHeaderJson())
                    .pipe(catchError(super.serviceError));
                }
            }
            