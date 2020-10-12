import { Component } from '@angular/core';
import { VeiculoMulta } from '../models/veiculoMulta';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  veiculoMulta: VeiculoMulta;

  constructor(private route: ActivatedRoute) {

    this.veiculoMulta = this.route.snapshot.data['veiculoMulta'];
  }

}
