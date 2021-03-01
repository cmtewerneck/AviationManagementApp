import { Component } from '@angular/core';
import { ManualEmpresa } from '../models/ManualEmpresa';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  manualEmpresa: ManualEmpresa;
  
  constructor(private route: ActivatedRoute) {
    
    this.manualEmpresa = this.route.snapshot.data['manualEmpresa'];
  }
  
}
