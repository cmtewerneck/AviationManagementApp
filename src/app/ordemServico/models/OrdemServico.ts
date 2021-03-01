import { Servico } from '../../servicos/models/Servico';

export class OrdemServico {
  id: string;
  numeroOrdem: string;
  tipo: string;
  ttsn: string;
  tcsnPousos: string;
  dataAbertura: Date;
  ttsnMotor: string;
  tcsnCiclos: string;
  dataFechamento?: Date;
  requisicaoMateriais: string;
  realizadoPor: string;
  realizadoPorAnac: string;
  dataRealizacao?: Date;
  inspecionadoPor: string;
  inspecionadoPorAnac: string;
  dataInspecao?: Date;

  aeronaveId: string;
  matriculaAeronave: string;
  servicos: Servico[];
}

export interface Aeronave {
  id: string;
  matricula: string;
}