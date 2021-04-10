export interface Rastreador {
  id: string;
  codigo: string;
  modelo: string;

  aeronaveId: string;
  matriculaAeronave: string;
}

export interface Aeronave {
  id: string;
  matricula: string;
}