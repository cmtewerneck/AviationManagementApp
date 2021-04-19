export interface AeronaveDiretriz {
  id: string;
  titulo: string;
  referencia: string;
  dataEfetivacao: Date;
  descricao: string;
  tipoDiretriz: number;
  intervaloHoras?: number;
  intervaloCiclos?: number;
  intervaloDias?: number;
  ultimoCumprimentoHoras?: number;
  ultimoCumprimentoCiclos?: number;
  ultimoCumprimentoData?: Date;
  observacoes: string;
  status: boolean;

  aeronaveId: string;
  matriculaAeronave: string;
  horasTotaisAeronave: number;
}

export interface Aeronave {
  id: string;
  matricula: string;
  horasTotais: number;
}