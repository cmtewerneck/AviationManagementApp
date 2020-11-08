import { Component } from '@angular/core';
import { ContasPagar } from '../models/ContasPagar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  contasPagar: ContasPagar;

  constructor(private route: ActivatedRoute) {

    this.contasPagar = this.route.snapshot.data['contasPagar'];
  }

}
