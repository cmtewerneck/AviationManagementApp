export interface AeronaveTarifa {
  id: string;
  data: Date;
  vencimento: Date;
  valor: number;
  situacao: boolean;
  numeracao: string;
  orgaoEmissorTarifa: number;
  
  aeronaveId: string;
  matriculaAeronave: string;
}

export interface Aeronave {
  id: string;
  matricula: string;
}