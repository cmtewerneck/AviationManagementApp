import { Component } from '@angular/core';
import { ContasReceber } from '../models/ContasReceber';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  contasReceber: ContasReceber;

  constructor(private route: ActivatedRoute) {

    this.contasReceber = this.route.snapshot.data['contasReceber'];
  }

}
