import { Component } from '@angular/core';
import { Curso } from '../models/Curso';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  imagens: string = environment.imagensUrl;

  curso: Curso;

  constructor(private route: ActivatedRoute) {

    this.curso = this.route.snapshot.data['curso'];
  }

}
