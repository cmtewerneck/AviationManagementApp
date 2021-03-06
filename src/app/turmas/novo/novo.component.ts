import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { TurmaService } from '../services/turma.service';
import { TurmaBaseComponent } from '../turma-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends TurmaBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private turmaService: TurmaService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
      
      this.turmaService.obterCursos()
      .subscribe(
        cursos => this.cursos = cursos);
        
        this.turmaForm = this.fb.group({
          codigo: ['', [Validators.required, Validators.maxLength(30)]],
          dataInicio: ['', Validators.required],
          dataTermino: [''],
          inscricao: ['0,00'],
          mensalidade: ['0,00'],
          cursoId: ['', [Validators.required]]
        });
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      adicionarTurma() {
        if (this.turmaForm.dirty && this.turmaForm.valid) {
          this.turma = Object.assign({}, this.turma, this.turmaForm.value);
          
          // CONVERSÕES PARA JSON
          this.turma.dataInicio = new Date(this.turma.dataInicio);
          if (this.turma.dataTermino) { this.turma.dataTermino = new Date(this.turma.dataTermino); } else { this.turma.dataTermino = null; }
          this.turma.inscricao = CurrencyUtils.StringParaDecimal(this.turma.inscricao);
          this.turma.mensalidade = CurrencyUtils.StringParaDecimal(this.turma.mensalidade);
          // FIM DAS CONVERSÕES
          
          console.log(this.turma);

          this.turmaService.novaTurma(this.turma)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );
            
            this.mudancasNaoSalvas = false;
          }
        }
        
        processarSucesso(response: any) {
          this.turmaForm.reset();
          this.errors = [];
          
          let toast = this.toastr.success('Turma cadastrada com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/turmas/listar-todos']);
            });
          }
        }
        
        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa...');
        }
      }      