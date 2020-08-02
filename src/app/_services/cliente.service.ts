import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../_models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseURL = 'https://localhost:44302/api/v1/clientes';

  constructor(private http: HttpClient) { }

  ObterTodos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseURL);
  }

  ObterPorId(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseURL}/${id}`);
  }

}
