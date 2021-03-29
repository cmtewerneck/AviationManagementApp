export interface VooInstrucao {
  id: string;
  data: Date;
  tempoVoo: number;
  avaliacao: boolean;
  observacoes: string;
  
  aeronaveId: string;
  matriculaAeronave: string;
  
  alunoId: string;
  nomeAluno: string;
  
  instrutorId: string;
  nomeInstrutor: string;
}

export interface Aeronave {
  id: string;
  matricula: string;
}

export interface Aluno {
  id: string;
  nome: string;
}

export interface Instrutor {
  id: string;
  nome: string;
}

export interface AlunoSaldoTotalVoado {
  id: string;
  tempoVoo: number;
}