import { Component } from '@angular/core';
import { Aluno } from '../models/Aluno';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  imagens: string = environment.imagensUrl;

  aluno: Aluno;

  constructor(private route: ActivatedRoute) {

    this.aluno = this.route.snapshot.data['aluno'];
  }

}
