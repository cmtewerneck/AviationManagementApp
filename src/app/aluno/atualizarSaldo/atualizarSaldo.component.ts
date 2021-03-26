import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlunoService } from '../services/aluno.service';
import { AlunoBaseComponent } from '../aluno-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-atualizar-saldo',
  templateUrl: './atualizarSaldo.component.html'
})
export class AtualizarSaldoComponent extends AlunoBaseComponent implements OnInit {
  
  imagens: string = environment.imagensUrl;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;
  
  constructor(private fb: FormBuilder,
    private alunoService: AlunoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.aluno = this.route.snapshot.data['aluno'];
    }
    
    ngOnInit(): void {
      this.alunoForm = this.fb.group({
        saldo: ['']
      });

      this.imagemOriginalSrc = this.imagens + this.aluno.imagem;
    }
    
    adicionarSaldo() {
      if (this.alunoForm.dirty && this.alunoForm.valid) {
        
        this.aluno = Object.assign({}, this.aluno, this.alunoForm.value);
        
        // CONVERSÕES PARA JSON
        this.aluno.saldo = CurrencyUtils.StringParaDecimal(this.aluno.saldo);
        // FIM DAS CONVERSÕES
        
        console.log(this.aluno);
        
        this.alunoService.AdicionarSaldo(this.aluno)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }

      removerSaldo() {
        if (this.alunoForm.dirty && this.alunoForm.valid) {
          
          this.aluno = Object.assign({}, this.aluno, this.alunoForm.value);
          
          // CONVERSÕES PARA JSON
          this.aluno.saldo = CurrencyUtils.StringParaDecimal(this.aluno.saldo);
          // FIM DAS CONVERSÕES
          
          console.log(this.aluno);
          
          this.alunoService.RemoverSaldo(this.aluno)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );
            
            this.mudancasNaoSalvas = false;
          }
        }
      
      processarSucesso(response: any) {
        this.alunoForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Saldo atualizado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/alunos/listar-todos']);
          });
        }
      }
      
      processarFalha(fail: any) {
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Opa :(');
      }

      manipularReader(readerEvt: any) {
        var binaryString = readerEvt.target.result;
        this.imageBase64 = btoa(binaryString);
        this.imagemPreview = 'data:image/jpeg;base64,' + this.imageBase64;
      }
      
}