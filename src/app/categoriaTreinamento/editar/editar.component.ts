import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaTreinamentoService } from '../services/categoriaTreinamento.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriaTreinamentoBaseComponent } from '../categoriaTreinamento-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends CategoriaTreinamentoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private categoriaTreinamentoService: CategoriaTreinamentoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.categoriaTreinamento = this.route.snapshot.data['categoriaTreinamento'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
        
      this.categoriaTreinamentoForm = this.fb.group({
        codigo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
        descricao: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
      });
        
      this.categoriaTreinamentoForm.patchValue({
        id: this.categoriaTreinamento.id,
        codigo: this.categoriaTreinamento.codigo,
        descricao: this.categoriaTreinamento.descricao
      });
        
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      editarCategoriaTreinamento() {
        if (this.categoriaTreinamentoForm.dirty && this.categoriaTreinamentoForm.valid) {
          this.categoriaTreinamento = Object.assign({}, this.categoriaTreinamento, this.categoriaTreinamentoForm.value);
          
          // CONVERSÕES DE JSON
          // FIM DAS CONVERSÕES

          console.log(this.categoriaTreinamento);
            
          this.categoriaTreinamentoService.atualizarCategoriaTreinamento(this.categoriaTreinamento)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );
            
            this.mudancasNaoSalvas = false;
          }
        }
        
        processarSucesso(response: any) {
          this.categoriaTreinamentoForm.reset();
          this.errors = [];
          
          let toast = this.toastr.success('Categoria editada com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/categorias-treinamentos/listar-todos']);
            });
          }
        }
        
        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
      }