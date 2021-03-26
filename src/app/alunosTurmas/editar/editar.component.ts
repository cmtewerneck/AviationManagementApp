import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlunoTurmaService } from '../services/alunoTurma.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlunoTurmaBaseComponent } from '../alunoTurma-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends AlunoTurmaBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private alunoTurmaService: AlunoTurmaService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.alunoTurma = this.route.snapshot.data['alunoTurma'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
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
        
        this.alunoTurmaForm.patchValue({
          id: this.alunoTurma.id,
          turmaId: this.alunoTurma.turmaId,
          alunoId: this.alunoTurma.alunoId
        });
        
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      editarAlunoTurma() {
        if (this.alunoTurmaForm.dirty && this.alunoTurmaForm.valid) {
          this.alunoTurma = Object.assign({}, this.alunoTurma, this.alunoTurmaForm.value);
          
          // CONVERSÕES PARA JSON
          // FIM DAS CONVERSÕES
          
          console.log(this.alunoTurma);
          
          this.alunoTurmaService.atualizarAlunoTurma(this.alunoTurma)
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
          
          let toast = this.toastr.success('Turma editada com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/turmas/listar-todos']);
            });
          }
        }
        
        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
      }