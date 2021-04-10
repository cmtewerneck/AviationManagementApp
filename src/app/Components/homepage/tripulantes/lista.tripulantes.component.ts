import { Component, Input } from '@angular/core';
import { Tripulante } from '../../../tripulantes/models/Tripulante';

@Component({
  selector: 'lista-tripulante',
  templateUrl: './lista.tripulantes.component.html'
})
export class ListaTripulantesComponent {
  
  errors: any[] = [];
    
    @Input()
    tripulantes: Tripulante[]    
    
}