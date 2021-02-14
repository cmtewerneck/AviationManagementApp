import { Component } from '@angular/core';
import { Instrutor } from '../models/Instrutor';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  imagens: string = environment.imagensUrl;

  instrutor: Instrutor;

  constructor(private route: ActivatedRoute) {

    this.instrutor = this.route.snapshot.data['instrutor'];
  }

}
