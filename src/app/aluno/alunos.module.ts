// MÓDULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlunosRoutingModule } from './alunos.routing';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';

// SERVIÇOS
import { AlunoService } from './services/aluno.service';
import { NgBrazil } from 'ng-brazil';

// COMPONENTES
import { ListaComponent } from './lista/lista.component';
import { AlunoAppComponent } from './aluno.app.component';
import { NovoComponent } from './novo/novo.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { AdicionarSaldoComponent } from './adicionarSaldo/adicionarSaldo.component';
import { AtualizarSaldoComponent } from './atualizarSaldo/atualizarSaldo.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { AlunoResolve } from './services/aluno.resolve';
import { AlunoGuard } from './services/aluno.guard';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
    declarations: [
        AlunoAppComponent,
        ListaComponent,
        NovoComponent,
        ExcluirComponent,
        EditarComponent,
        AdicionarSaldoComponent,
        AtualizarSaldoComponent,
        DetalhesComponent
    ],
    imports: [
        CommonModule,
        AlunosRoutingModule,
        FormsModule,
        RouterModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        NgBrazil,
        TextMaskModule,
        NgxSpinnerModule,
        ImageCropperModule
    ],
    providers: [
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: AuthInterceptor,
        //     multi: true
        // },
        AlunoService,
        AlunoResolve,
        AlunoGuard
    ]
})
export class AlunoModule {}