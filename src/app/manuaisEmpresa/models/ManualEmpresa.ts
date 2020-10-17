export interface ManualEmpresa {
    id: string;
    descricao: string;
    sigla: string;
    revisaoAtual: number;
    dataRevisao: Date;
    revisaoAnalise?: number;
    arquivo: string;
    arquivoUpload: string;
  }