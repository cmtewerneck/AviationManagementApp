//import { Produto } from './Produto';
import { Endereco } from './Endereço';

export class Fornecedor {
        id: string;
        nome: string;
        documento: string;
        ativo: boolean;
        tipoFornecedor: number;

        endereco: Endereco;
//      produtos: Produto[];
}
