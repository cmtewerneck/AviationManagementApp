import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlunoService } from '../services/aluno.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlunoBaseComponent } from '../aluno-form.base.component';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';
import { utilsBr } from 'js-brasil';
import { environment } from 'src/environments/environment';
import { AbstractControl } from '@angular/forms';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-adicionar-saldo',
  templateUrl: './adicionarSaldo.component.html'
})
export class AdicionarSaldoComponent extends AlunoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
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
        saldo: ['', Validators.required]
      });
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
      
}