import { Component } from '@angular/core';
import { AeronaveTarifa } from '../models/AeronaveTarifa';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  aeronaveTarifa: AeronaveTarifa;

  constructor(private route: ActivatedRoute) {

    this.aeronaveTarifa = this.route.snapshot.data['aeronaveTarifa'];
  }

}
