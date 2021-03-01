import { Component } from '@angular/core';
import { Servico } from '../models/Servico';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  servico: Servico;
  
  constructor(private route: ActivatedRoute) {
    
    this.servico = this.route.snapshot.data['servico'];
  }
  
}
