import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CursoService } from '../services/curso.service';
import { CursoBaseComponent } from '../curso-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends CursoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private cursoService: CursoService,
    private router: Router,
    private toastr: ToastrService) {super();}
    
    ngOnInit(): void {
      this.cursoForm = this.fb.group({
        codigo: ['', [Validators.required, Validators.maxLength(30)]],
        descricao: ['', [Validators.required, Validators.maxLength(50)]]
      });
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    adicionarCurso() {
      if (this.cursoForm.dirty && this.cursoForm.valid) {
        this.curso = Object.assign({}, this.curso, this.cursoForm.value);
        
        // this.formResult = JSON.stringify(this.produto);
        
        this.cursoService.novoCurso(this.curso)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.cursoForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Curso cadastrado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/cursos/listar-todos']);
          });
        }
      }
      
      processarFalha(fail: any) {
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Opa :(');
      }
    }