export interface ContasPagar {
    // CONTAS 
    id: string;
    dataVencimento?: Date;
    descricao: string;
    codigoBarras: string;
    situacao: number;
    formaPagamento: string;

    // CONTAS PAGAR
    valorPagar: number;
    valorPago?: number;
    dataPagamento?: Date;
}