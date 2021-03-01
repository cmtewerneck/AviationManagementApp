export interface AeronaveTarifa {
  id: string;
  data: Date;
  vencimento: Date;
  valor: number;
  situacao: boolean;
  numeracao: string;
  orgaoEmissor: number;
  
  matriculaAeronave: string;
  aeronaveId: string;
}

export interface Aeronave {
  id: string;
  matricula: string;
}