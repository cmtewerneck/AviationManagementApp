export interface Estoque {
    id: string;
    item?: number;
    partNumber: string;
    nomenclatura: string;
    quantidade: number;
    localizacao: string;
    partNumberAlternativo: string;
    aplicacao: string;
    capitulo: string;
    serialNumber: string;
    doc: string;
    status: string;
    imagem: string;
    imagemUpload: string;
}