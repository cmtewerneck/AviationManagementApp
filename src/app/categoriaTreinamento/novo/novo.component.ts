import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaTreinamentoService } from '../services/categoriaTreinamento.service';
import { CategoriaTreinamentoBaseComponent } from '../categoriaTreinamento-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends CategoriaTreinamentoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(
    private fb: FormBuilder,
    private categoriaTreinamentoService: CategoriaTreinamentoService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
                
            this.categoriaTreinamentoForm = this.fb.group({
              codigo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
              descricao: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
            });
          }
          
          ngAfterViewInit(): void {
            super.configurarValidacaoFormulario(this.formInputElements);
          }
          
          adicionarCategoriaTreinamento() {
            if (this.categoriaTreinamentoForm.dirty && this.categoriaTreinamentoForm.valid) {
              this.categoriaTreinamento = Object.assign({}, this.categoriaTreinamento, this.categoriaTreinamentoForm.value);
              
              // CONVERSÕES DE JSON
              // FIM DAS CONVERSÕES
              
              console.log(this.categoriaTreinamento);
              
              this.categoriaTreinamentoService.novaCategoriaTreinamento(this.categoriaTreinamento)
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
              
              let toast = this.toastr.success('Categoria cadastrada com sucesso!', 'Sucesso!');
              if (toast) {
                toast.onHidden.subscribe(() => {
                  this.router.navigate(['/categorias-treinamentos/listar-todos']);
                });
              }
            }
            
            processarFalha(fail: any) {
              this.errors = fail.error.errors;
              this.toastr.error('Ocorreu um erro!', 'Opa...');
            }
          }      