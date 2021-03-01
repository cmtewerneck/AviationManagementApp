import { SuprimentoMovimentacao } from '../../suprimentosMovimentacao/models/SuprimentoMovimentacao';

export interface Suprimento {
    id: string;
    codigo: string;
    partNumber: string;
    nomenclatura: string;
    quantidade: number;
    localizacao: string;
    partNumberAlternativo: string;
    aplicacao: string;
    capitulo: string;
    serialNumber: string;
    doc: string;
    
    imagem: string;
    imagemUpload: string;
    
    suprimentosMovimentacoes: SuprimentoMovimentacao[];
}