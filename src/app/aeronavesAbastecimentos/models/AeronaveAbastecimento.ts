export interface AeronaveAbastecimento {
  id: string;
  data: Date;
  litros: number;
  local: string;
  cupom: string;
  notaFiscal: string;
  fornecedora: string;
  responsavel: string;
  valor?: number;
  observacoes: string;

  comprovante: string;
  comprovanteUpload: string;

  aeronaveId: string;
  matriculaAeronave: string;
}

export interface Aeronave {
  id: string;
  matricula: string;
}