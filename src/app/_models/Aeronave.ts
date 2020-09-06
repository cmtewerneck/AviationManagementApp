import { AeronaveAbastecimento } from './AeronaveAbastecimento';
import { AeronaveTarifa } from './AeronaveTarifa';

export interface Aeronave {
        id: string;
        matricula: string;
        fabricante: string;
        categoria: string;
        modelo: string;
        ano?: number;
        pesoVazio?: number;
        horasTotais?: number;
        horasRestantes?: number;
        vencimentoCA?: Date;
        vencimentoCM?: Date;
        ultimaPesagem?: Date;
        vencimentoReta?: Date;
        aeronavesAbastecimentos: AeronaveAbastecimento[];
        aeronavesTarifas: AeronaveTarifa[];
}
