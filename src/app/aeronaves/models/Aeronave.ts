import { AeronaveAbastecimento } from 'src/app/aeronavesAbastecimentos/models/AeronaveAbastecimento';
import { AeronaveTarifa } from 'src/app/aeronavesTarifas/models/AeronaveTarifa';
import { VooAgendado } from 'src/app/voosAgendados/models/VooAgendado';
import { DiarioBordo } from 'src/app/diariosBordo/models/DiarioBordo';
import { OrdemServico } from 'src/app/ordemServico/models/OrdemServico';
// import { VooInstrucao } from 'src/app/voosInstrucao/models/VooInstrucao';

export interface Aeronave {
  id: string;
  matricula: string;
  fabricante: string;
  categoria: string;
  modelo: string;
  numeroSerie: string;
  ano?: number;
  pesoVazio?: number;
  pesoBasico?: number;
  horasTotais?: number;
  horasRestantes?: number;
  tipoAeronave: number;
  vencimentoCA?: Date;
  vencimentoCVA?: Date;
  vencimentoCM?: Date;
  ultimaPesagem?: Date;
  proximaPesagem?: Date;
  vencimentoReta?: Date;
  vencimentoCasco?: Date;
  motor: string;
  modeloMotor: string;
  numeroSerieMotor: string;

  imagem: string;
  imagemUpload: string;
  
  aeronaveTarifa: AeronaveTarifa[];
  aeronaveAbastecimento: AeronaveAbastecimento[];
  vooAgendado: VooAgendado[];
  // vooInstrucao: VooInstrucao[];
  diarioBordo: DiarioBordo[];
  ordemServico: OrdemServico[];
}