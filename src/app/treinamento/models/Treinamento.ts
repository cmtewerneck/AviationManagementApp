export interface Treinamento {
  id: string;
  dataInicio: Date;
  dataTermino?: Date;
  classificacaoTreinamento: number;
  tipoTreinamento: number;
  tipoClasse: number;
  modeloAeronave: string;
  instrutor: string;
  numero: string;
  cargaHoraria: number;
  
  tripulanteId: string;
  nomeTripulante: string;

  categoriaId: string;
  descricaoCategoria: string;
}

export interface Tripulante {
  id: string;
  nome: string;
}

export interface CategoriaTreinamento {
  id: string;
  descricao: string;
}