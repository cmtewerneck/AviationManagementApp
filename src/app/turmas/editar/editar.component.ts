import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TurmaService } from '../services/turma.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TurmaBaseComponent } from '../turma-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends TurmaBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private turmaService: TurmaService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.turma = this.route.snapshot.data['turma'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.turmaService.obterCursos()
      .subscribe(
        cursos => this.cursos = cursos);
        
        this.turmaForm = this.fb.group({
          codigo: ['', [Validators.required, Validators.maxLength(30)]],
          dataInicio: ['', Validators.required],
          dataTermino: [''],
          cursoId: ['', [Validators.required]]
        });
        
        this.turmaForm.patchValue({
          id: this.turma.id,
          codigo: this.turma.codigo,
          dataInicio: this.turma.dataInicio,
          dataTermino: this.turma.dataTermino,
          cursoId: this.turma.cursoId
        });
        
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      editarTurma() {
        if (this.turmaForm.dirty && this.turmaForm.valid) {
          this.turma = Object.assign({}, this.turma, this.turmaForm.value);
          
          // CONVERSÕES PARA JSON
          this.turma.dataInicio = new Date(this.turma.dataInicio);
          if (this.turma.dataTermino) { this.turma.dataTermino = new Date(this.turma.dataTermino); } else { this.turma.dataTermino = null; }
          // FIM DAS CONVERSÕES
          
          console.log(this.turma);
          
          this.turmaService.atualizarTurma(this.turma)
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