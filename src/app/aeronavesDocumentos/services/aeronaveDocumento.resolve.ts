import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AeronaveDocumento } from '../models/AeronaveDocumento';
import { AeronaveDocumentoService } from './aeronaveDocumento.service';

@Injectable()
export class AeronaveDocumentoResolve implements Resolve<AeronaveDocumento> {

    constructor(private aeronaveDocumentoService: AeronaveDocumentoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.aeronaveDocumentoService.obterPorId(route.params['id']);
    }
}