import { VeiculoGasto } from "src/app/veiculosGastos/models/VeiculoGasto";

export class Motorista {
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

  // COLABORADOR - MOTORISTA
  dataNascimento?: Date;
  dataAdmissao: Date;
  dataDemissao?: Date;
  tipoColaborador: number; // TRIPULANTE NO ENUM (5)
  cargo: string; // MOTORISTA
  canac: string;
  salario?: number;
  tipoVinculo: number;
  rg: string;
  orgaoEmissor: string;
  tituloEleitor: string;
  numeroPis: string;
  numeroCtps: string;
  numeroCnh: string;

  veiculosGastos: VeiculoGasto[];
  // veiculosMultas: VeiculoMulta[];
}