import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlunoTurmaService } from '../services/alunoTurma.service';
import { AlunoTurmaBaseComponent } from '../alunoTurma-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends AlunoTurmaBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private alunoTurmaService: AlunoTurmaService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
      
      this.alunoTurmaService.obterAlunos()
      .subscribe(
        alunos => this.alunos = alunos);

        this.alunoTurmaService.obterTurmas()
      .subscribe(
        turmas => this.turmas = turmas);
        
        this.alunoTurmaForm = this.fb.group({
          turmaId: ['', [Validators.required]],
          alunoId: ['', [Validators.required]]
        });
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      adicionarAlunoTurma() {
        if (this.alunoTurmaForm.dirty && this.alunoTurmaForm.valid) {
          this.alunoTurma = Object.assign({}, this.alunoTurma, this.alunoTurmaForm.value);
          
          // CONVERSÕES PARA JSON
          // FIM DAS CONVERSÕES
          
          console.log(this.alunoTurma);
          
          this.alunoTurmaService.novaAlunoTurma(this.alunoTurma)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );
            
            this.mudancasNaoSalvas = false;
          }
        }
        
        processarSucesso(response: any) {
          this.alunoTurmaForm.reset();
          this.errors = [];
          
          let toast = this.toastr.success('Aluno cadastrado com sucesso!', 'Sucesso!');
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