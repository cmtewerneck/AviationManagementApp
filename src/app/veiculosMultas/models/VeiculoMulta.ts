export interface VeiculoMulta {
  id: string;
  data: Date;
  autoInfracao: string;
  responsavel: string;
  classificacao: string;
  descricao: string;
  situacao: boolean;
  valor?: number;
  
  veiculoId: string;
  placaVeiculo: string;
}

export interface Veiculo {
  id: string;
  placa: string;
}