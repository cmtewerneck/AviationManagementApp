export class OrdemServico {
  id: string;
  numeroOrdem: string;
  tipo: string;
  aeronaveId: string;
  matriculaAeronave: string;
  modelo: string;
  numeroSerie: string;
  ttsn: string;
  tcsnPousos: string;
  dataAbertura: Date;
  motor: string;
  modeloMotor: string;
  numeroSerieMotor: string;
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
}

export interface Aeronave {
  id: string;
  matricula: string;
}