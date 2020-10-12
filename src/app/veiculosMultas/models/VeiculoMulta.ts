export interface VeiculoMulta {
    id: string;
    veiculoId: string;
    autoInfracao: string;
    motorista: string;
    classificacao: string;
    descricao: string;
    data: Date;
    situacao: boolean;

    placaVeiculo: string;
  }

export interface Veiculo {
    id: string;
    placa: string;
  }