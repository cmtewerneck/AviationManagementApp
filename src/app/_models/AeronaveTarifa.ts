export interface AeronaveTarifa {
        data: Date;
        vencimento: Date;
        valor: number;
        situacao: boolean;
        arquivo: string;
        numeracao: string;
        orgaoEmissor: string;

        aeronaveId: string;
}