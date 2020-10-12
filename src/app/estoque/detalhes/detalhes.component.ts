import { Component } from '@angular/core';
import { Estoque } from '../models/estoque';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  imagens: string = environment.imagensUrl;

  estoque: Estoque;

  constructor(private route: ActivatedRoute) {

    this.estoque = this.route.snapshot.data['estoque'];
  }

}
