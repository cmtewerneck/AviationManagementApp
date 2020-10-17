import { Component } from '@angular/core';
import { VeiculoGasto } from '../models/veiculoGasto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  veiculoGasto: VeiculoGasto;

  constructor(private route: ActivatedRoute) {

    this.veiculoGasto = this.route.snapshot.data['veiculoGasto'];
  }

}
