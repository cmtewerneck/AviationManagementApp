import { Component } from '@angular/core';
import { Suprimento } from '../models/Suprimento';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  imagens: string = environment.imagensUrl;

  suprimento: Suprimento;

  constructor(private route: ActivatedRoute) {

    this.suprimento = this.route.snapshot.data['suprimento'];
  }

}
