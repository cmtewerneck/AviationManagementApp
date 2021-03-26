export interface SuprimentoMovimentacao {
    id: string;
    data: Date;
    quantidade: number;
    tipoMovimentacaoEnum: number;
    
    itemId: string;
    nomenclaturaItem: string;
}

export interface Suprimento {
    id: string;
    nomenclatura: string;
}