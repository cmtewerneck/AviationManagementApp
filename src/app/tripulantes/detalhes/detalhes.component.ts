import { Component } from '@angular/core';
import { Tripulante } from '../models/tripulante';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  imagens: string = environment.imagensUrl;
  
  tripulante: Tripulante;
  
  constructor(private route: ActivatedRoute) {
    
    this.tripulante = this.route.snapshot.data['tripulante'];
  }
  
}
