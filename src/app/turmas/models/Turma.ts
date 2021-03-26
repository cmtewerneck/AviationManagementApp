import { Aluno } from '../../aluno/models/Aluno';

export interface Turma {
  id: string;
  codigo: string;
  dataInicio: Date;
  dataTermino?: Date;

  cursoId: string;
  codigoCurso: string;
  descricaoCurso: string;
  alunosTurmas: Aluno[];
}

export interface Curso {
  id: string;
  codigo: string;
  descricao: string;
}