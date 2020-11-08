export interface ContasReceber {
    id: string;
    dataVencimento: Date;
    valorPagar: number;
    descricao: string;
    codigoBarras: string;
    dataRecebimento?: Date;
    valorRecebido?: number;
    situacao: boolean;
    formaPagamento: string;
  }