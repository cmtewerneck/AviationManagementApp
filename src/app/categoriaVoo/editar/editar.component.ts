import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaVooService } from '../services/categoriaVoo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriaVooBaseComponent } from '../categoriaVoo-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends CategoriaVooBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private categoriaVooService: CategoriaVooService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.categoriaVoo = this.route.snapshot.data['categoriaVoo'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
        
      this.categoriaVooForm = this.fb.group({
        codigo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
        descricao: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
      });
        
      this.categoriaVooForm.patchValue({
        id: this.categoriaVoo.id,
        codigo: this.categoriaVoo.codigo,
        descricao: this.categoriaVoo.descricao
      });
        
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      editarCategoriaVoo() {
        if (this.categoriaVooForm.dirty && this.categoriaVooForm.valid) {
          this.categoriaVoo = Object.assign({}, this.categoriaVoo, this.categoriaVooForm.value);
          
          // CONVERSÕES DE JSON
          // FIM DAS CONVERSÕES

          console.log(this.categoriaVoo);
            
          this.categoriaVooService.atualizarCategoriaVoo(this.categoriaVoo)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );
            
            this.mudancasNaoSalvas = false;
          }
        }
        
        processarSucesso(response: any) {
          this.categoriaVooForm.reset();
          this.errors = [];
          
          let toast = this.toastr.success('Categoria editada com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/categorias-voos/listar-todos']);
            });
          }
        }
        
        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
      }