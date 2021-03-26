import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../models/Aluno';
import { BaseService } from 'src/app/_services/base.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AlunoService extends BaseService {

  constructor(private http: HttpClient) { super(); }


  ObterTodos(): Observable<Aluno[]> {
    return this.http
      .get<Aluno[]>(this.urlServiceV1 + 'alunos', this.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  ObterPorId(id: string): Observable<Aluno> {
    return this.http
      .get<Aluno>(this.urlServiceV1 + 'alunos/' + id, this.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  AdicionarAluno(aluno: Aluno): Observable<Aluno> {
    return this.http
      .post(this.urlServiceV1 + 'alunos', aluno, this.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  EditarAluno(aluno: Aluno): Observable<Aluno> {
    return this.http
      .put(this.urlServiceV1 + 'alunos/' + aluno.id, aluno, this.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  ExcluirAluno(id: string): Observable<Aluno> {
    return this.http
      .delete(this.urlServiceV1 + 'alunos/' + id, this.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  AdicionarSaldo(aluno: Aluno): Observable<Aluno> {
    return this.http
      .put(this.urlServiceV1 + 'alunos/adicionar-saldo/' + aluno.id, aluno, this.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  RemoverSaldo(aluno: Aluno): Observable<Aluno> {
    return this.http
      .put(this.urlServiceV1 + 'alunos/remover-saldo/' + aluno.id, aluno, this.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }
}
