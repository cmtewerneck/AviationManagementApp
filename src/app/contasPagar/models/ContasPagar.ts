export interface ContasPagar {
    id: string;
    dataVencimento: Date;
    valorPagar: number;
    descricao: string;
    codigoBarras: string;
    dataPagamento?: Date;
    valorPago?: number;
    situacao: boolean;
    formaPagamento: string;
  }