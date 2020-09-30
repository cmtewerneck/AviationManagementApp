import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor } from '../models/Fornecedor';
import { BaseService } from 'src/app/_services/base.service';
import { catchError, map } from 'rxjs/operators';
import { CepConsulta, Endereco } from '../models/Endereço';

@Injectable()
export class FornecedorService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  ObterTodos(): Observable<Fornecedor[]> {
    return this.http
      .get<Fornecedor[]>(this.urlServiceV1 + 'fornecedores')
      .pipe(catchError(super.serviceError));
  }

  ObterPorId(id: string): Observable<Fornecedor> {
    return this.http
      .get<Fornecedor>(this.urlServiceV1 + 'fornecedores/' + id, super.obterHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  AdicionarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http
      .post(this.urlServiceV1 + 'fornecedores', fornecedor, this.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  EditarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http
      .put(this.urlServiceV1 + 'fornecedores/' + fornecedor.id, fornecedor, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  ExcluirFornecedor(id: string): Observable<Fornecedor> {
    return this.http
      .delete(this.urlServiceV1 + 'fornecedores/' + id, super.ObterAuthHeaderJson())
      .pipe(  
        map(super.extractData),
        catchError(super.serviceError));
  }

  AtualizarEndereco(endereco: Endereco): Observable<Endereco> {
    return this.http
      .put(this.urlServiceV1 + 'fornecedores/endereco/' + endereco.id, endereco, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  consultarCep(cep: string): Observable<CepConsulta> {
    return this.http
      .get<CepConsulta>(`https://cors-anywhere.herokuapp.com/https://viacep.com.br/ws/${cep}/json/`)
      .pipe(catchError(super.serviceError));
  }


}
