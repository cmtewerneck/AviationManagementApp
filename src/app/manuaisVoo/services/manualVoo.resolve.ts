import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ManualVoo } from '../models/ManualVoo';
import { ManualVooService } from './manualVoo.service';

@Injectable()
export class ManualVooResolve implements Resolve<ManualVoo> {

    constructor(private manualVooService: ManualVooService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.manualVooService.obterPorId(route.params['id']);
    }
}