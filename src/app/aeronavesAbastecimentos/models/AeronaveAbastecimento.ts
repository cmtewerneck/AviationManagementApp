export interface AeronaveAbastecimento {
  id: string;
  aeronaveId: string;
  matriculaAeronave: string;
  data: Date;
  litros: number;
  local: string;
  cupom: string;
  notaFiscal: string;
  fornecedora: string;
  responsavel: string;
  observacoes: string;
}

export interface Aeronave {
  id: string;
  matricula: string;
}