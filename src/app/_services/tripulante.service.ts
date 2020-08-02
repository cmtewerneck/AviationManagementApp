import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tripulante } from '../_models/Tripulante';

@Injectable({
  providedIn: 'root'
})
export class TripulanteService {

  baseURL = 'https://localhost:44302/api/v1/tripulantes';

  constructor(private http: HttpClient) { }

  ObterTodos(): Observable<Tripulante[]> {
    return this.http.get<Tripulante[]>(this.baseURL);
  }

  ObterPorId(id: string): Observable<Tripulante> {
    return this.http.get<Tripulante>(`${this.baseURL}/${id}`);
  }

}
