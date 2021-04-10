import { Component, Input } from '@angular/core';
import { OrdemServico } from '../../../OrdemServico/models/OrdemServico';

@Component({
  selector: 'lista-ordensServico',
  templateUrl: './lista.ordensServico.component.html'
})
export class ListaOrdensServicoComponent {
  
  errors: any[] = [];
    
    @Input()
    ordensServico: OrdemServico[]    
    
}