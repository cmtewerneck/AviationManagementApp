export interface SuprimentoMovimentacao {
    id: string;
    data: Date;
    quantidade: number;
    tipoMovimentacao: number;
    
    itemId: string;
    itemNomenclatura: string;
}

export interface Suprimento {
    id: string;
    nomenclatura: string;
}