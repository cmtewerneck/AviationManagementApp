import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor } from '../_models/Fornecedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  baseURL = 'https://localhost:44302/api/v1/fornecedores';

  constructor(private http: HttpClient) { }

  ObterTodos(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.baseURL);
  }

  ObterPorId(id: string): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.baseURL}/${id}`);
  }

  AdicionarFornecedor(fornecedor: Fornecedor) {
    return this.http.post(this.baseURL, fornecedor);
  }

  EditarFornecedor(fornecedor: Fornecedor) {
    return this.http.put(`${this.baseURL}/${fornecedor.id}`, fornecedor);
  }

  ExcluirFornecedor(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
