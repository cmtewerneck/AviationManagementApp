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
}

export interface Aeronave {
  id: string;
  matricula: string;
}