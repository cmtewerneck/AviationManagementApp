export interface AeronaveTarifa {
  id: string;
  aeronaveId: string;
  matriculaAeronave: string;
  data: Date;
  vencimento: Date;
  valor: number;
  orgaoEmissor: string;
  numeracao: string;
  situacao: boolean;
}

export interface Aeronave {
  id: string;
  matricula: string;
}