import { AeronaveAbastecimento } from 'src/app/aeronavesAbastecimentos/models/AeronaveAbastecimento';
import { AeronaveTarifa } from 'src/app/aeronavesTarifas/models/AeronaveTarifa';
import { VooAgendado } from 'src/app/voosAgendados/models/VooAgendado';
import { DiarioBordo } from 'src/app/diariosBordo/models/DiarioBordo';
import { OrdemServico } from 'src/app/ordemServico/models/OrdemServico';
import { VooInstrucao } from 'src/app/voosInstrucao/models/VooInstrucao';
import { AeronaveMotor } from 'src/app/aeronavesMotores/models/AeronaveMotor';
import { AeronaveDocumento } from 'src/app/aeronavesDocumentos/models/AeronaveDocumento';

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
  horasTotais: number;
  proximaIntervencao: number;
  horasRestantes?: number;
  tipoAeronave: number;
  ultimaPesagem?: Date;
  proximaPesagem?: Date;
  situacao: boolean;
  ativo: boolean;

  imagem: string;
  imagemUpload: string;
  
  aeronaveTarifa: AeronaveTarifa[];
  aeronavesMotores: AeronaveMotor[];
  aeronavesDocumentos: AeronaveDocumento[];
  aeronaveAbastecimento: AeronaveAbastecimento[];
  vooAgendado: VooAgendado[];
  vooInstrucao: VooInstrucao[];
  diarioBordo: DiarioBordo[];
  ordemServico: OrdemServico[];
}