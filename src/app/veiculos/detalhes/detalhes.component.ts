import { Component } from '@angular/core';
import { Veiculo } from '../models/Veiculo';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  imagens: string = environment.imagensUrl;

  veiculo: Veiculo;

  constructor(private route: ActivatedRoute) {

    this.veiculo = this.route.snapshot.data['veiculo'];
  }

}
