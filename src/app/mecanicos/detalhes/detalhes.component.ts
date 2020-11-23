import { Component } from '@angular/core';
import { Mecanico } from '../models/mecanico';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  imagens: string = environment.imagensUrl;

  mecanico: Mecanico;

  constructor(private route: ActivatedRoute) {

    this.mecanico = this.route.snapshot.data['mecanico'];
  }

}
