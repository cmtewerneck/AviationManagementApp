import { Component } from '@angular/core';
import { Turma } from '../models/Turma';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  turma: Turma;

  constructor(private route: ActivatedRoute) {

    this.turma = this.route.snapshot.data['turma'];
  }

}