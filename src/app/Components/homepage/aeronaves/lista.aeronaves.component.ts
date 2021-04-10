import { Component, Input } from '@angular/core';
import { Aeronave } from '../../../aeronaves/models/Aeronave';

@Component({
  selector: 'lista-aeronave',
  templateUrl: './lista.aeronaves.component.html'
})
export class ListaAeronavesComponent {
  
  errors: any[] = [];
    
    @Input()
    aeronaves: Aeronave[]    
    
}