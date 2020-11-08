import { Component } from '@angular/core';
import { VooAgendado } from '../models/VooAgendado';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  vooAgendado: VooAgendado;

  constructor(private route: ActivatedRoute) {

    this.vooAgendado = this.route.snapshot.data['vooAgendado'];
  }

}
