export interface VeiculoGasto {
  id: string;
  data: Date;
  descricao: string;
  situacao: boolean;
  valor: number;
  
  veiculoId: string;
  placaVeiculo: string;

  motoristaId: string;
  nomeMotorista: string;
}

export interface Veiculo {
  id: string;
  placa: string;
}

export interface Colaborador {
  id: string;
  nome: string;
}