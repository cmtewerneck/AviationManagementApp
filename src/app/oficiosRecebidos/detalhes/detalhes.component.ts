import { Component } from '@angular/core';
import { OficioRecebido } from '../models/OficioRecebido';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  oficioRecebido: OficioRecebido;

  constructor(private route: ActivatedRoute) {

    this.oficioRecebido = this.route.snapshot.data['oficioRecebido'];
  }

}
