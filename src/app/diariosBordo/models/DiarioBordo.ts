export interface DiarioBordo {
  id: string;
  data: Date;
  base: string;
  de: string;
  para: string;
  horaAcionamento: Date;
  horaDecolagem?: Date;
  horaPouso?: Date;
  horaCorte: Date;
  totalDiurno?: Date;
  totalNoturno?: Date;
  totalIfr?: Date;
  totalNavegacao?: Date;
  totalDecimal: number;
  totalDecPouso?: number;
  totalAcionamentoCorte: number;
  pousos: number;
  pob: number;
  combustivelDecolagem: number;
  naturezaVoo: number;
  preVooResponsavel: string;
  posVooResponsavel: string;
  observacoes: string;
  discrepancias: string;
  acoesCorretivas: string;
  
  aeronaveId: string;
  matriculaAeronave: string;
  
  comandanteId: string;
  nomeComandante: string;
  
  copilotoId: string;
  nomeCopiloto: string;
  
  mecanicoId: string;
  nomeMecanico: string;
}

export interface Aeronave {
  id: string;
  matricula: string;
}

export interface Tripulante {
  id: string;
  nome: string;
}

export interface Mecanico {
  id: string;
  nome: string;
}