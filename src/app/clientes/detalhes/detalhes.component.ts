import { Component } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  imagens: string = environment.imagensUrl;

  cliente: Cliente;

  constructor(private route: ActivatedRoute) {

    this.cliente = this.route.snapshot.data['cliente'];
  }

}
