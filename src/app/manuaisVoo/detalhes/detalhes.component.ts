import { Component } from '@angular/core';
import { ManualVoo } from '../models/ManualVoo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  manualVoo: ManualVoo;
  
  constructor(private route: ActivatedRoute) {
    
    this.manualVoo = this.route.snapshot.data['manualVoo'];
  }
  
}
