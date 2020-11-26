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
  descricaoServicosProgramados: string;
  descricaoServicosRealizados: string;
  tempoGasto: string;
  requisicaoMateriais: string;
  realizadoPor: string;
  realizadoPorAnac: string;
  dataRealizacao?: Date;
  inspecionadoPor: string;
  inspecionadoPorAnac: string;
  dataInspecao?: Date;
  aeronaveId: string;
  matriculaAeronave: string;
}

export interface Aeronave {
  id: string;
  matricula: string;
  modelo: string;
  numeroSerie: string;
  motor: string;
  modeloMotor: string;
  numeroSerieMotor: string;
}