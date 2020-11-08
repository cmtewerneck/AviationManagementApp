import { Component } from '@angular/core';
import { Legislacao } from '../models/Legislacao';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  legislacao: Legislacao;

  constructor(private route: ActivatedRoute) {

    this.legislacao = this.route.snapshot.data['legislacao'];
  }

}
