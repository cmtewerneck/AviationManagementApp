import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CursoService } from '../services/curso.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CursoBaseComponent } from '../curso-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends CursoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private cursoService: CursoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.curso = this.route.snapshot.data['curso'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.cursoForm = this.fb.group({
        codigo: ['', [Validators.required, Validators.maxLength(30)]],
        descricao: ['', [Validators.required, Validators.maxLength(50)]]
      });
      
      this.cursoForm.patchValue({
        id: this.curso.id,
        codigo: this.curso.codigo,
        descricao: this.curso.descricao        
      });
      
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    editarCurso() {
      if (this.cursoForm.dirty && this.cursoForm.valid) {
        this.curso = Object.assign({}, this.curso, this.cursoForm.value);
        
        this.cursoService.atualizarCurso(this.curso)
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
        
        let toast = this.toastr.success('Curso editado com sucesso!', 'Sucesso!');
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