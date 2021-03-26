export interface AlunoTurma {
  id: string;

  turmaId: string;
  codigoTurma: string;
  alunoId: string;
  nomeAluno: string;
}

export interface Turma {
  id: string;
  codigo: string;
}

export interface Aluno {
  id: string;
  nome: string;
}