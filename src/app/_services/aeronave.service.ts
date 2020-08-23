import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aeronave } from '../_models/Aeronave';

@Injectable({
  providedIn: 'root'
})
export class AeronaveService {

  baseURL = 'https://localhost:44302/api/v1/aeronaves';

  constructor(private http: HttpClient) {
  }

  ObterTodos(): Observable<Aeronave[]> {
    return this.http.get<Aeronave[]>(this.baseURL);
  }

  ObterPorId(id: string): Observable<Aeronave> {
    return this.http.get<Aeronave>(`${this.baseURL}/${id}`);
  }

}
