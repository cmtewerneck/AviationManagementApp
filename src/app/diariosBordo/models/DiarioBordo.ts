export interface DiarioBordo {
    id: string;
    data: Date;
    base: string;
    comandante: string;
    comandanteCanac: string;
    copiloto: string;
    copilotoCanac: string;
    aeronaveId: string;
    matriculaAeronave: string;
    de: string;
    para: string;
    horaAcionamento: string;
    horaDecolagem: string;
    horaPouso: string;
    horaCorte: string;
    totalDiurno: string;
    totalNoturno: string;
    totalIfr: string;
    totalNavegacao: string;
    totalDecimal: string;
    pousos: number;
    pob: number;
    combustivelDecolagem: number;
    combustivelAbastecido?: number;
    cupomAbastecimento: string;
    natureza: string;
    preVoo: string;
    posVoo: string;
    chefeMissao: string;
    observacoes: string;
    discrepancias: string;
    acoesCorretivas: string;
    mecanicoResponsavel: string;
}

export interface Aeronave {
  id: string;
  matricula: string;
}