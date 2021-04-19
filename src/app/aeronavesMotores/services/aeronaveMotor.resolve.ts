import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AeronaveMotor } from '../models/AeronaveMotor';
import { AeronaveMotorService } from './aeronaveMotor.service';

@Injectable()
export class AeronaveMotorResolve implements Resolve<AeronaveMotor> {

    constructor(private aeronaveMotorService: AeronaveMotorService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.aeronaveMotorService.obterPorId(route.params['id']);
    }
}