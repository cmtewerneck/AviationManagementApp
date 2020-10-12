import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Aeronave } from '../models/Aeronave';
import { AeronaveService } from './aeronave.service';

@Injectable()
export class AeronaveResolve implements Resolve<Aeronave> {

    constructor(private aeronaveService: AeronaveService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.aeronaveService.obterPorId(route.params['id']);
    }
}