export interface Legislacao {
    id: string;
    titulo: string;
    tipo: string;
    numero: number;
    emenda?: number;
    data?: Date;
    arquivo: string;
    arquivoUpload: string;
  }