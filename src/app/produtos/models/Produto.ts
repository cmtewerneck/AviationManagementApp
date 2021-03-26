export interface Produto {
    id: string;
    nome: string;
    descricao: string;
    valor: number;
    ativo: boolean;
    fornecedorId: string;
    nomeFornecedor: string;
    
    imagem: string;
    imagemUpload: string;
}

export interface Fornecedor {
    id: string;
    nome: string;
}