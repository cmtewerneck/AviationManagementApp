export interface PassagemAerea {
  id: string;
  dataCompra: Date;
  dataVoo: Date;
  valor: number;
  empresa: string;
  origem: string;
  destino: string;
  formaPagamento: string;
  assento: string;
  localizador: string;
  
  colaboradorId: string;
  nomeColaborador: string;
}