import { Component, Input } from '@angular/core';
import { AeronaveTarifa } from '../../../aeronavesTarifas/models/AeronaveTarifa';

@Component({
  selector: 'lista-tarifa',
  templateUrl: './lista.tarifas.component.html'
})
export class ListaTarifasComponent {
  
  errors: any[] = [];
    
    @Input()
    aeronaveTarifas: AeronaveTarifa[]    
    
}