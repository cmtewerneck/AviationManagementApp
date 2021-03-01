import { VeiculoGasto } from '../../veiculosGastos/models/VeiculoGasto';
import { VeiculoMulta } from '../../veiculosMultas/models/VeiculoMulta';

export class Veiculo {
    id: string;
    placa: string;
    ufPlaca: string;
    ano?: number;
    proprio: boolean;
    kmAtual?: number;
    modelo: string;
    renavam: string;
    tipoCombustivel: number;
    
    imagem: string;
    imagemUpload: string;

    veiculosMultas: VeiculoMulta[];
    veiculosGastos: VeiculoGasto[];
}