import { Component } from '@angular/core';
import { SuprimentoMovimentacao } from '../models/SuprimentoMovimentacao';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  suprimentoMovimentacao: SuprimentoMovimentacao;

  constructor(private route: ActivatedRoute) {

    this.suprimentoMovimentacao = this.route.snapshot.data['suprimentoMovimentacao'];
  }

}
