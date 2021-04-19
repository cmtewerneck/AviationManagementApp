import { VooAgendado } from "../../voosAgendados/models/VooAgendado";

export interface CategoriaVoo {
  id: string;
  codigo: string;
  descricao: string;

  voosAgendados: VooAgendado[];
}