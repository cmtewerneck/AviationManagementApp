import { DiarioBordo } from "src/app/diariosBordo/models/DiarioBordo";
import { PassagemAerea } from "src/app/passagensAereas/models/PassagemAerea";

export interface Mecanico {
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

  // COLABORADOR - MECÂNICO
  dataNascimento?: Date;
  dataAdmissao: Date;
  dataDemissao?: Date;
  tipoColaborador: number; // TRIPULANTE NO ENUM (4)
  cargo: string; // MECÂNICO
  canac: string;
  salario?: number;
  tipoVinculo: number;
  rg: string;
  orgaoEmissor: string;
  tituloEleitor: string;
  numeroPis: string;
  numeroCtps: string;
  numeroCnh: string;

  diariosBordoMecanico: DiarioBordo[];
  passagemAerea: PassagemAerea[];
  }