import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Instrutor } from '../models/Instrutor';
import { InstrutorService } from './instrutor.service';

@Injectable()
export class InstrutorResolve implements Resolve<Instrutor> {

    constructor(private instrutorService: InstrutorService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.instrutorService.obterPorId(route.params['id']);
    }
}