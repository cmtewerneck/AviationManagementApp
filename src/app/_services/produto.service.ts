import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../_models/Produto';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  protected baseURL = 'https://localhost:44302/api/v1/produtos';

  constructor(private http: HttpClient) {
  }

  ObterTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseURL);
  }

  ObterPorId(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseURL}/${id}`);
  }

  AdicionarProduto(produto: Produto) {
    return this.http.post(this.baseURL, produto);
  }

  EditarProduto(produto: Produto) {
    return this.http.put(`${this.baseURL}/${produto.id}`, produto);
  }

  ExcluirProduto(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
