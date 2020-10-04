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
        { path: 'acesso-negado', component: AcessoNegadoComponent },
        { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
