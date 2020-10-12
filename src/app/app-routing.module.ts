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
        { path: 'produtos',
            loadChildren: () => import('./produtos/produtos.module')
            .then(m => m.ProdutoModule)
        },
        { path: 'tripulantes',
            loadChildren: () => import('./tripulantes/tripulantes.module')
            .then(m => m.TripulanteModule)
        },
        { path: 'estoque',
            loadChildren: () => import('./estoque/estoque.module')
            .then(m => m.EstoqueModule)
        },
        { path: 'aeronaves',
            loadChildren: () => import('./aeronaves/aeronaves.module')
            .then(m => m.AeronaveModule)
        },
        { path: 'veiculos',
            loadChildren: () => import('./veiculos/veiculo.module')
            .then(m => m.VeiculoModule)
        },
        { path: 'veiculos-multas',
            loadChildren: () => import('./veiculosMultas/veiculosMultas.module')
            .then(m => m.VeiculoMultaModule)
        },
        { path: 'clientes',
            loadChildren: () => import('./clientes/clientes.module')
            .then(m => m.ClientesModule)
        },
        { path: 'oficios-recebidos',
            loadChildren: () => import('./oficiosRecebidos/oficiosRecebidos.module')
            .then(m => m.OficiosRecebidosModule)
        },
        { path: 'oficios-emitidos',
            loadChildren: () => import('./oficiosEmitidos/oficiosEmitidos.module')
            .then(m => m.OficiosEmitidosModule)
        },
        { path: 'acesso-negado', component: AcessoNegadoComponent },
        { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
