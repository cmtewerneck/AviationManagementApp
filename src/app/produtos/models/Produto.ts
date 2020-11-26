export interface Produto {
    id: string;
    nome: string;
    descricao: string;
    imagem: string;
    imagemUpload: string;
    valor: number;
    ativo: true;
    fornecedorId: string;
    fornecedorNome: string;
}

export interface Fornecedor {
    id: string;
    nome: string;
}