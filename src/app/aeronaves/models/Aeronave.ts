export interface Aeronave {
    id: string;
    matricula: string;
    fabricante: string;
    categoria: string;
    modelo: string;
    ano?: number;
    pesoVazio?: number;
    horasTotais?: number;
    horasRestantes?: number;
    vencimentoCa?: Date;
    vencimentoCm?: Date;
    ultimaPesagem?: Date;
    vencimentoReta?: Date;
    imagem: string;
    imagemUpload: string;
  }