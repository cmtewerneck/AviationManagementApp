export interface VooAgendado {
    id: string;
    descricao: string;
    comecaEm: number;
    terminaEm: number;
    diaTodo: true;
    aeronaveId: string;
    matriculaAeronave: string;
  }

export interface Aeronave {
    id: string;
    matricula: string;
  }