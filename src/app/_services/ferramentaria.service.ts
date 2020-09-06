import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ferramentaria } from '../_models/Ferramentaria';

@Injectable({
  providedIn: 'root'
})
export class FerramentariaService {

  baseURL = 'https://localhost:44302/api/v1/materiais';

  constructor(private http: HttpClient) {
  }

  ObterTodas(): Observable<Ferramentaria[]> {
    return this.http.get<Ferramentaria[]>(this.baseURL);
  }

  ObterPorId(id: string): Observable<Ferramentaria> {
    return this.http.get<Ferramentaria>(`${this.baseURL}/${id}`);
  }

  AdicionarFerramentaria(ferramentaria: Ferramentaria) {
    return this.http.post(this.baseURL, ferramentaria);
  }

  EditarFerramentaria(ferramentaria: Ferramentaria) {
    return this.http.put(`${this.baseURL}/${ferramentaria.id}`, ferramentaria);
  }

  ExcluirFerramentaria(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
