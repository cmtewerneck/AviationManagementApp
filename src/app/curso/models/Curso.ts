import { Turma } from '../../turmas/models/Turma';

export interface Curso {
    id: string;
    codigo: string;
    descricao: string;

    turmas: Turma[];
}