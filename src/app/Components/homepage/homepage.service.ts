import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from '../../_services/base.service';

@Injectable()
export class HomepageService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterQuantidadeAeronavesCadastradas(): Observable<number> {
        return this.http
            .get<number>(this.urlServiceV1 + 'aeronaves/quantidade', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterQuantidadeTripulantesCadastrados(tipoColaborador: number): Observable<number> {
        return this.http
            .get<number>(this.urlServiceV1 + 'colaboradores/quantidade/' + tipoColaborador, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterQuantidadeOrdensAbertas(): Observable<number> {
        return this.http
            .get<number>(this.urlServiceV1 + 'ordem-servico/quantidade', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }
}
