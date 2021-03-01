//import { AlunosTurmas } from '../../alunosTurmas/models/AlunoTurma';

export interface Turma {
  id: string;
  codigo: string;
  dataInicio: Date;
  dataTermino?: Date;

  cursoId: string;
  cursoCodigo: string;
  cursoDescricao: string;
  //alunosTurmas: AlunosTurmas[];
}

export interface Curso {
  id: string;
  codigo: string;
  descricao: string;
}