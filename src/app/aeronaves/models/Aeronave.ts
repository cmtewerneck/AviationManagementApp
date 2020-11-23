import { AeronaveAbastecimento } from 'src/app/aeronavesAbastecimentos/models/AeronaveAbastecimento';
import { AeronaveTarifa } from 'src/app/aeronavesTarifas/models/AeronaveTarifa';
import { VooAgendado } from 'src/app/voosAgendados/models/VooAgendado';
import { DiarioBordo } from 'src/app/diariosBordo/models/DiarioBordo';
import { OrdemServico } from 'src/app/ordemServico/models/OrdemServico';

export interface Aeronave {
    id: string;
    matricula: string;
    fabricante: string;
    categoria: string;
    modelo: string;
    numeroSerie: string;
    ano?: number;
    pesoVazio?: number;
    horasTotais?: number;
    horasRestantes?: number;
    vencimentoCa?: Date;
    vencimentoCm?: Date;
    ultimaPesagem?: Date;
    vencimentoReta?: Date;
    imagem: string;
    imagemUpload: string;

    aeronaveTarifa: AeronaveTarifa[];
    aeronaveAbastecimento: AeronaveAbastecimento[];
    vooAgendado: VooAgendado[];
    diarioBordo: DiarioBordo[];
    ordemServico: OrdemServico[];
  }