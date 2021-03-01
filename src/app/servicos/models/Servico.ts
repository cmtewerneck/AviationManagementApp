import { OrdemServico } from '../../ordemServico/models/OrdemServico';

export class Servico {
  id: string;
  codigo: string;
  titulo: string;
  custo?: number;

  ordensServico: OrdemServico[];
}
