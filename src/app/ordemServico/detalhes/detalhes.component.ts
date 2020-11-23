import { Component } from '@angular/core';
import { OrdemServico } from '../models/OrdemServico';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  ordemServico: OrdemServico;

  constructor(private route: ActivatedRoute) {

    this.ordemServico = this.route.snapshot.data['ordemServico'];
  }

}
