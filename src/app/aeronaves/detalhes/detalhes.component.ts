import { Component } from '@angular/core';
import { Aeronave } from '../models/Aeronave';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  imagens: string = environment.imagensUrl;

  aeronave: Aeronave;

  constructor(private route: ActivatedRoute) {

    this.aeronave = this.route.snapshot.data['aeronave'];
  }

}
