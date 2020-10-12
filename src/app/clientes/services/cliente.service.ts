import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';
import { BaseService } from 'src/app/_services/base.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClienteService extends BaseService {

  constructor(private http: HttpClient) { super(); }


  ObterTodos(): Observable<Cliente[]> {
    return this.http
      .get<Cliente[]>(this.urlServiceV1 + 'clientes', this.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  ObterPorId(id: string): Observable<Cliente> {
    return this.http
      .get<Cliente>(this.urlServiceV1 + 'clientes/' + id, this.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  AdicionarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(this.urlServiceV1 + 'clientes', cliente, this.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  EditarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http
      .put(this.urlServiceV1 + 'clientes/' + cliente.id, cliente, this.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  ExcluirCliente(id: string): Observable<Cliente> {
    return this.http
      .delete(this.urlServiceV1 + 'clientes/' + id, this.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }
}
