import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaVooService } from '../services/categoriaVoo.service';
import { CategoriaVooBaseComponent } from '../categoriaVoo-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends CategoriaVooBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(
    private fb: FormBuilder,
    private categoriaVooService: CategoriaVooService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
                
            this.categoriaVooForm = this.fb.group({
              codigo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
              descricao: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
            });
          }
          
          ngAfterViewInit(): void {
            super.configurarValidacaoFormulario(this.formInputElements);
          }
          
          adicionarCategoriaVoo() {
            if (this.categoriaVooForm.dirty && this.categoriaVooForm.valid) {
              this.categoriaVoo = Object.assign({}, this.categoriaVoo, this.categoriaVooForm.value);
              
              // CONVERSÕES DE JSON
              // FIM DAS CONVERSÕES
              
              console.log(this.categoriaVoo);
              
              this.categoriaVooService.novaCategoriaVoo(this.categoriaVoo)
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
              
              let toast = this.toastr.success('Categoria cadastrada com sucesso!', 'Sucesso!');
              if (toast) {
                toast.onHidden.subscribe(() => {
                  this.router.navigate(['/categorias-voos/listar-todos']);
                });
              }
            }
            
            processarFalha(fail: any) {
              this.errors = fail.error.errors;
              this.toastr.error('Ocorreu um erro!', 'Opa...');
            }
          }      