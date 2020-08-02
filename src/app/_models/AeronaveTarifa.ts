export interface AeronaveTarifa {
        aeronaveId: string;
        data: Date;
        vencimento: Date;
        valor: number;
        situacao: boolean;
        arquivo: string;
        numeracao: string;
        orgaoEmissor: string;
}