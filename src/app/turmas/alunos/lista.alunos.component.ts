import { Component, Input } from '@angular/core';
import { AlunoTurma } from '../../alunosTurmas/models/AlunoTurma';
import { Aluno } from '../../aluno/models/Aluno';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'lista-aluno',
  templateUrl: './lista.alunos.component.html'
})
export class ListaAlunosComponent {

  imagens: string = environment.imagensUrl;

  @Input()
  //alunosTurmas: Aluno[];
  alunosTurmas: AlunoTurma[];
}