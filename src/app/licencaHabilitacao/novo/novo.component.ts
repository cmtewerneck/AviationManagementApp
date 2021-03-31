import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LicencaHabilitacaoService } from '../services/licencaHabilitacao.service';
import { LicencaHabilitacaoBaseComponent } from '../licencaHabilitacao-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends LicencaHabilitacaoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private licencaHabilitacaoService: LicencaHabilitacaoService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
      
        this.licencaHabilitacaoService.obterColaboradores()
        .subscribe(
          colaboradores => this.colaboradores = colaboradores);
            
            this.licencaHabilitacaoForm = this.fb.group({
              titulo: ['', [Validators.required, Validators.maxLength(20)]],
              validade: ['', Validators.required],
              colaboradorId: ['', [Validators.required]]
            });
          }
          
          ngAfterViewInit(): void {
            super.configurarValidacaoFormulario(this.formInputElements);
          }
          
          adicionarLicencaHabilitacao() {
            if (this.licencaHabilitacaoForm.dirty && this.licencaHabilitacaoForm.valid) {
              this.licencaHabilitacao = Object.assign({}, this.licencaHabilitacao, this.licencaHabilitacaoForm.value);
              
              // CONVERSÕES DE JSON
              this.licencaHabilitacao.validade = new Date(this.licencaHabilitacao.validade);
              // FIM DAS CONVERSÕES
              
              console.log(this.licencaHabilitacao);
              
              this.licencaHabilitacaoService.novaLicencaHabilitacao(this.licencaHabilitacao)
              .subscribe(
                sucesso => { this.processarSucesso(sucesso) },
                falha => { this.processarFalha(falha) }
                );
                
                this.mudancasNaoSalvas = false;
              }
            }
            
            processarSucesso(response: any) {
              this.licencaHabilitacaoForm.reset();
              this.errors = [];
              
              let toast = this.toastr.success('Cadastrado com sucesso!', 'Sucesso!');
              if (toast) {
                toast.onHidden.subscribe(() => {
                  this.router.navigate(['/licencas-habilitacoes/listar-todos']);
                });
              }
            }
            
            processarFalha(fail: any) {
              this.errors = fail.error.errors;
              this.toastr.error('Ocorreu um erro!', 'Opa...');
            }
          }      