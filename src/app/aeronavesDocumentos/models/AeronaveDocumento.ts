export interface AeronaveDocumento {
  id: string;
  titulo: string;
  dataEmissao?: Date;
  dataValidade: Date;

  arquivo: string;
  arquivoUpload: string;

  aeronaveId: string;
  matriculaAeronave: string;
}

export interface Aeronave {
  id: string;
  matricula: string;
}