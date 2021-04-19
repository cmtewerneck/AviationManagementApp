import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AeronaveDiretriz } from '../models/AeronaveDiretriz';
import { AeronaveDiretrizService } from './aeronaveDiretriz.service';

@Injectable()
export class AeronaveDiretrizResolve implements Resolve<AeronaveDiretriz> {

    constructor(private aeronaveDiretrizService: AeronaveDiretrizService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.aeronaveDiretrizService.obterPorId(route.params['id']);
    }
}