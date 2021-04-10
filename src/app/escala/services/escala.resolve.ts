import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Escala } from '../models/Escala';
import { EscalaService } from './escala.service';

@Injectable()
export class EscalaResolve implements Resolve<Escala> {
    
    constructor(private escalaService: EscalaService) { }
    
    resolve(route: ActivatedRouteSnapshot) {
        return this.escalaService.obterPorId(route.params['id']);
    }
}