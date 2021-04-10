import { Component, Input } from '@angular/core';
import { Treinamento } from '../../../treinamento/models/Treinamento';

@Component({
  selector: 'lista-treinamento',
  templateUrl: './lista.treinamentos.component.html'
})
export class ListaTreinamentosComponent {
  
  errors: any[] = [];
    
    @Input()
    treinamentos: Treinamento[]    
    
}