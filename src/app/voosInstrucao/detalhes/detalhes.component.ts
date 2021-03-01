import { Component } from '@angular/core';
import { VooInstrucao } from '../models/VooInstrucao';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  vooInstrucao: VooInstrucao;

  constructor(private route: ActivatedRoute) {

    this.vooInstrucao = this.route.snapshot.data['vooInstrucao'];
  }

}