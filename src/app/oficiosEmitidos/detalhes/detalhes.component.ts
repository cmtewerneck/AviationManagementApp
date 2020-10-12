import { Component } from '@angular/core';
import { OficioEmitido } from '../models/oficioEmitido';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  oficioEmitido: OficioEmitido;

  constructor(private route: ActivatedRoute) {

    this.oficioEmitido = this.route.snapshot.data['oficioEmitido'];
  }

}
