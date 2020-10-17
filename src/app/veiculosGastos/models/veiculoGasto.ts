export interface VeiculoGasto {
    id: string;
    veiculoId: string;
    data: Date;
    descricao: string;
    motorista: string;
    valor: number;
    situacao: boolean;
    placaVeiculo: string;
  }

export interface Veiculo {
    id: string;
    placa: string;
  }