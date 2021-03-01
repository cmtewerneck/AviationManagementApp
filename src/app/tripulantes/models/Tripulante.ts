import { DiarioBordo } from '../../diariosBordo/models/DiarioBordo';

export class Tripulante {
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

  // COLABORADOR - TRIPULANTE
  dataNascimento?: Date;
  dataAdmissao: Date;
  dataDemissao?: Date;
  tipoColaborador: number = 2; // TRIPULANTE NO ENUM
  cargo: string = "Tripulante";
  canac: string;
  salario?: number;
  tipoVinculo: number;
  rg: string;
  orgaoEmissor: string;
  tituloEleitor: string;
  numeroPis: string;
  numeroCtps: string;
  numeroCnh: string;

  diariosBordoComandante: DiarioBordo[];
  diariosBordoCopiloto: DiarioBordo[];
}