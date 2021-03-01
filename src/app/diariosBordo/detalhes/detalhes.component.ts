import { Component } from '@angular/core';
import { DiarioBordo } from '../models/DiarioBordo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  diarioBordo: DiarioBordo;

  constructor(private route: ActivatedRoute) {

    this.diarioBordo = this.route.snapshot.data['diarioBordo'];
  }

}