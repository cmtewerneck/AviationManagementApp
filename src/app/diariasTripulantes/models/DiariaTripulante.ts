export interface DiariaTripulante {
  id: string;
  dataInicio: Date;
  dataFim?: Date;
  valor: number;
  finalidade: string;
  status: number;
  formaPagamento: string;
  
  tripulanteId: string;
  nomeTripulante: string;
}

export interface Tripulante {
  id: string;
  nome: string;
}