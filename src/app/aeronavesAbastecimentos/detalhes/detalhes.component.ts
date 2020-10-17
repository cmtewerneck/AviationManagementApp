import { Component } from '@angular/core';
import { AeronaveAbastecimento } from '../models/AeronaveAbastecimento';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  aeronaveAbastecimento: AeronaveAbastecimento;

  constructor(private route: ActivatedRoute) {

    this.aeronaveAbastecimento = this.route.snapshot.data['aeronaveAbastecimento'];
  }

}
