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

  ObterTodas(): Observable<Aeronave[]> {
    return this.http.get<Aeronave[]>(this.baseURL);
  }

  ObterPorId(id: string): Observable<Aeronave> {
    return this.http.get<Aeronave>(`${this.baseURL}/${id}`);
  }

  AdicionarAeronave(aeronave: Aeronave) {
    return this.http.post(this.baseURL, aeronave);
  }

  EditarAeronave(aeronave: Aeronave) {
    return this.http.put(`${this.baseURL}/${aeronave.id}`, aeronave);
  }

  ExcluirAeronave(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
