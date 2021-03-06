import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { PageNotFoundComponent } from './navegacao/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { AcessoNegadoComponent } from './navegacao/acesso-negado/acesso-negado.component';

const routes: Routes = [
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: HomepageComponent, canActivate: [AuthGuard] },
        { path: 'conta',
            loadChildren: () => import('./conta/conta.module')
            .then(m => m.ContaModule)
        },
        { path: 'fornecedores',
            loadChildren: () => import('./fornecedores/fornecedores.module')
            .then(m => m.FornecedoresModule)
        },
        { path: 'diarias-tripulantes',
            loadChildren: () => import('./diariasTripulantes/diariaTripulante.module')
            .then(m => m.DiariaTripulanteModule)
        },
        { path: 'categorias-voos',
            loadChildren: () => import('./categoriaVoo/categoriaVoo.module')
            .then(m => m.CategoriaVooModule)
        },
        { path: 'passagens-aereas',
            loadChildren: () => import('./passagensAereas/passagemAerea.module')
            .then(m => m.PassagemAereaModule)
        },
        { path: 'regulamentei',
            loadChildren: () => import('./regulamentei/regulamentei.module')
            .then(m => m.RegulamenteiModule)
        },
        { path: 'relprev',
            loadChildren: () => import('./relprev/relprev.module')
            .then(m => m.RelprevModule)
        },
        { path: 'produtos',
            loadChildren: () => import('./produtos/produtos.module')
            .then(m => m.ProdutoModule)
        },
        { path: 'tripulantes',
            loadChildren: () => import('./tripulantes/tripulantes.module')
            .then(m => m.TripulanteModule)
        },
        { path: 'suprimentos',
            loadChildren: () => import('./suprimentos/suprimento.module')
            .then(m => m.SuprimentoModule)
        },
        { path: 'suprimentos-movimentacoes',
            loadChildren: () => import('./suprimentosMovimentacao/suprimentoMovimentacao.module')
            .then(m => m.SuprimentoMovimentacaoModule)
        },
        { path: 'diarios-bordo',
            loadChildren: () => import('./diariosBordo/diariosBordo.module')
            .then(m => m.DiarioBordoModule)
        },
        { path: 'escalas',
            loadChildren: () => import('./escala/escala.module')
            .then(m => m.EscalaModule)
        },
        { path: 'licencas-habilitacoes',
            loadChildren: () => import('./licencaHabilitacao/licencaHabilitacao.module')
            .then(m => m.LicencaHabilitacaoModule)
        },
        { path: 'contas-pagar',
            loadChildren: () => import('./contasPagar/contasPagar.module')
            .then(m => m.ContasPagarModule)
        },
        { path: 'treinamentos',
            loadChildren: () => import('./treinamento/treinamento.module')
            .then(m => m.TreinamentoModule)
        },
        { path: 'categorias-treinamentos',
            loadChildren: () => import('./categoriaTreinamento/categoriaTreinamento.module')
            .then(m => m.CategoriaTreinamentoModule)
        },
        { path: 'rastreadores',
            loadChildren: () => import('./rastreador/rastreador.module')
            .then(m => m.RastreadorModule)
        },
        { path: 'turmas',
            loadChildren: () => import('./turmas/turma.module')
            .then(m => m.TurmaModule)
        },
        { path: 'contas-receber',
            loadChildren: () => import('./contasReceber/contasReceber.module')
            .then(m => m.ContasReceberModule)
        },
        { path: 'servicos',
            loadChildren: () => import('./servicos/servico.module')
            .then(m => m.ServicoModule)
        },
        { path: 'ordem-servico',
            loadChildren: () => import('./ordemServico/ordemServico.module')
            .then(m => m.OrdemServicoModule)
        },
        { path: 'aeronaves',
            loadChildren: () => import('./aeronaves/aeronaves.module')
            .then(m => m.AeronaveModule)
        },
        { path: 'aeronaves-abastecimentos',
            loadChildren: () => import('./aeronavesAbastecimentos/aeronavesAbastecimentos.module')
            .then(m => m.AeronaveAbastecimentoModule)
        },
        { path: 'aeronaves-motores',
            loadChildren: () => import('./aeronavesMotores/aeronaveMotor.module')
            .then(m => m.AeronaveMotorModule)
        },
        { path: 'aeronaves-documentos',
            loadChildren: () => import('./aeronavesDocumentos/aeronaveDocumento.module')
            .then(m => m.AeronaveDocumentoModule)
        },
        { path: 'aeronaves-diretrizes',
            loadChildren: () => import('./aeronavesDiretrizes/aeronaveDiretriz.module')
            .then(m => m.AeronaveDiretrizModule)
        },
        { path: 'aeronaves-tarifas',
            loadChildren: () => import('./aeronavesTarifas/aeronavesTarifas.module')
            .then(m => m.AeronaveTarifaModule)
        },
        { path: 'motoristas',
            loadChildren: () => import('./motoristas/motoristas.module')
            .then(m => m.MotoristaModule)
        },
        { path: 'voos-agendados',
            loadChildren: () => import('./voosAgendados/voosAgendados.module')
            .then(m => m.VooAgendadoModule)
        },
        { path: 'voos-instrucao',
            loadChildren: () => import('./voosInstrucao/vooInstrucao.module')
            .then(m => m.VooInstrucaoModule)
        },
        { path: 'veiculos',
            loadChildren: () => import('./veiculos/veiculo.module')
            .then(m => m.VeiculoModule)
        },
        { path: 'manuais-empresa',
            loadChildren: () => import('./manuaisEmpresa/manuaisEmpresa.module')
            .then(m => m.ManualEmpresaModule)
        },
        { path: 'manuais-voo',
            loadChildren: () => import('./manuaisVoo/manuaisVoo.module')
            .then(m => m.ManualVooModule)
        },
        { path: 'legislacoes',
            loadChildren: () => import('./legislacoes/legislacao.module')
            .then(m => m.LegislacaoModule)
        },
        { path: 'veiculos-multas',
            loadChildren: () => import('./veiculosMultas/veiculosMultas.module')
            .then(m => m.VeiculoMultaModule)
        },
        { path: 'veiculos-gastos',
            loadChildren: () => import('./veiculosGastos/veiculosGastos.module')
            .then(m => m.VeiculoGastoModule)
        },
        { path: 'clientes',
            loadChildren: () => import('./clientes/clientes.module')
            .then(m => m.ClientesModule)
        },
        { path: 'mecanicos',
            loadChildren: () => import('./mecanicos/mecanicos.module')
            .then(m => m.MecanicoModule)
        },
        { path: 'oficios-recebidos',
            loadChildren: () => import('./oficiosRecebidos/oficiosRecebidos.module')
            .then(m => m.OficiosRecebidosModule)
        },
        { path: 'oficios-emitidos',
            loadChildren: () => import('./oficiosEmitidos/oficiosEmitidos.module')
            .then(m => m.OficiosEmitidosModule)
        },
        { path: 'instrutores',
            loadChildren: () => import('./instrutores/instrutores.module')
            .then(m => m.InstrutorModule)
        },
        { path: 'alunos',
            loadChildren: () => import('./aluno/alunos.module')
            .then(m => m.AlunoModule)
        },
        { path: 'alunos-turmas',
            loadChildren: () => import('./alunosTurmas/alunoTurma.module')
            .then(m => m.AlunoTurmaModule)
        },
        { path: 'cursos',
            loadChildren: () => import('./curso/curso.module')
            .then(m => m.CursoModule)
        },
        { path: 'acesso-negado', component: AcessoNegadoComponent },
        { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
