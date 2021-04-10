import { Escala } from 'src/app/escala/models/Escala';
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
  validadeCMA?: Date;
  tipoColaborador: number; // TRIPULANTE NO ENUM
  cargo: string;
  canac: string;
  salario?: number;
  tipoVinculo: number;
  rg: string;
  orgaoEmissor: string;
  tituloEleitor: string;
  numeroPis: string;
  numeroCtps: string;
  numeroCnh: string;

  diarioBordoComandante: DiarioBordo[];
  diarioBordoCopiloto: DiarioBordo[];
  escalas: Escala[];
}