import { Treinamento } from "../../treinamento/models/Treinamento";

export interface CategoriaTreinamento {
  id: string;
  codigo: string;
  descricao: string;

  treinamentos: Treinamento[];
}