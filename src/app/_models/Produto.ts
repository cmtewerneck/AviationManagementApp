export interface Produto {
    id: string;
    nome: string;
    descricao: string;
    imagem: string;
    valor: number;
    ativo: boolean;

    fornecedorId: string;
}
