import { VooInstrucao } from "src/app/voosInstrucao/models/VooInstrucao";

export interface Instrutor {
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
 
   // COLABORADOR - INSTRUTOR
   dataNascimento?: Date;
   dataAdmissao: Date;
   dataDemissao?: Date;
   tipoColaborador: number; // TRIPULANTE NO ENUM (3)
   cargo: string; // INSTRUTOR
   canac: string;
   salario?: number;
   tipoVinculo: number;
   rg: string;
   orgaoEmissor: string;
   tituloEleitor: string;
   numeroPis: string;
   numeroCtps: string;
   numeroCnh: string;
 
   voosInstrucao: VooInstrucao[];
}