export interface LicencaHabilitacao {
  id: string;
  titulo: string;
  validade: Date;
  
  colaboradorId: string;
  nomeColaborador: string;
}

export interface Colaborador {
  id: string;
  nome: string;
}