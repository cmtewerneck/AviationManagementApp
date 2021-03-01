import { Produto } from '../../produtos/models/Produto';
import { Endereco } from './Endereço';

export class Fornecedor {
        // PESSOA
        id: string;
        nome: string;
        tipoPessoa: number;
        documento: string; 
        sexo: number;
        estadoCivil: string;
        ativo: boolean;
        telefone: string;
        email: string;
        
        imagem: string;
        imagemUpload: string;

        endereco: Endereco;
        produtos: Produto[];
}
