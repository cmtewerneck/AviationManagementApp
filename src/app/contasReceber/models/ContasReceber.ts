export interface ContasReceber {
  // CONTAS 
  id: string;
  dataVencimento?: Date;
  descricao: string;
  codigoBarras: string;
  situacao: number;
  formaPagamento: string;
  
  // CONTAS RECEBER
  valorReceber: number;
  valorRecebido?: number;
  dataRecebimento?: Date;
}