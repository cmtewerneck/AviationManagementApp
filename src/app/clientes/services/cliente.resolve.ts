import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Cliente } from '../models/Cliente';
import { ClienteService } from './cliente.service';

@Injectable()
export class ClienteResolve implements Resolve<Cliente> {

    constructor(private clienteService: ClienteService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.clienteService.ObterPorId(route.params['id']);
    }
}