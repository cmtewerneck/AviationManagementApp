export interface Legislacao {
    id: string;
    titulo: string;
    tipoLegislacao: number;
    numero: number;
    emenda?: number;
    dataEmenda?: Date;
    
    arquivo: string;
    arquivoUpload: string;
  }