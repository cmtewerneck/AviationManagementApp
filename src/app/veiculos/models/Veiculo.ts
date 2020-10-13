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
    imagem: string;
    imagemUpload: string;
    tipoCombustivel: number;

    veiculosMultas: VeiculoMulta[];
}