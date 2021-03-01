export interface Cliente {
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
}