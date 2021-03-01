import { VooInstrucao } from "src/app/voosInstrucao/models/VooInstrucao";

export interface Aluno {
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

        // ALUNO
        rg: string;
        canac: string;
        totalVoado: number;
        saldo: number;
        dataNascimento: Date;
        validadeCMA?: Date;     
        
        vooInstrucao: VooInstrucao[];
        // alunoTurma: AlunoTurma[];
}