export interface AeronaveMotor {
  id: string;
  fabricante: string;
  modelo: string;
  numeroSerie: string;
  horasTotais?: number;
  ciclosTotais?: number;

  aeronaveId: string;
  matriculaAeronave: string;
}

export interface Aeronave {
  id: string;
  matricula: string;
}