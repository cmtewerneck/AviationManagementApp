import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from '../../_services/base.service';
import { Aeronave } from '../../aeronaves/models/Aeronave';
import { Tripulante } from '../../tripulantes/models/Tripulante';
import { Treinamento } from '../../treinamento/models/Treinamento';
import { AeronaveTarifa } from '../../aeronavesTarifas/models/AeronaveTarifa';
import { OrdemServico } from '../../ordemServico/models/OrdemServico';

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

    obterAeronaves(): Observable<Aeronave[]> {
        return this.http
            .get<Aeronave[]>(this.urlServiceV1 + 'aeronaves', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterTripulantes(tipoColaborador: number): Observable<Tripulante[]> {
        return this.http
            .get<Tripulante[]>(this.urlServiceV1 + 'colaboradores/' + tipoColaborador, this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterTreinamentos(): Observable<Treinamento[]> {
        return this.http
            .get<Treinamento[]>(this.urlServiceV1 + 'treinamentos', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterAeronaveTarifas(): Observable<AeronaveTarifa[]> {
        return this.http
            .get<AeronaveTarifa[]>(this.urlServiceV1 + 'aeronaves/tarifas', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterOrdensServico(): Observable<OrdemServico[]> {
        return this.http
            .get<OrdemServico[]>(this.urlServiceV1 + 'ordem-servico', this.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }
}
