export interface VooAgendado {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  editable: boolean;
  durationEditable: boolean;
  backgroundColor: string;
  textColor: string;

  aeronaveId: string;
  matriculaAeronave: string;

  categoriaId: string;
  descricaoCategoria: string;
}

export interface Aeronave {
  id: string;
  matricula: string;
}

export interface CategoriaVoo {
  id: string;
  descricao: string;
}