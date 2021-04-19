export class OficioEmitidoPaged {
  list: {
    id: string;
    data: Date;
    numeracao: string;
    mensagem: string;
    responsavel: string;
    destinatario: string;
    assunto: string;
    arquivo: string;
    arquivoUpload: string;
  }
  totalResults: number;
  pageIndex: number;
  pageSize: number;
}