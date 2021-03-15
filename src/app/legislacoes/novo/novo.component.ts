import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LegislacaoService } from '../services/legislacao.service';
import { LegislacaoBaseComponent } from '../legislacao-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends LegislacaoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private legislacaoService: LegislacaoService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
      
      this.legislacaoForm = this.fb.group({
        titulo: ['', [Validators.required, Validators.maxLength(50)]],
        tipoLegislacao: ['', Validators.required],
        numero: ['', [Validators.required]],
        emenda: [''],
        dataEmenda: [''],
        arquivo: ['']
      });
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    adicionarLegislacao() {
      if (this.legislacaoForm.dirty && this.legislacaoForm.valid) {
        this.legislacao = Object.assign({}, this.legislacao, this.legislacaoForm.value);
        
        // INSERIR DADOS PARA UPLOAD DO ARQUIVO PDF
        
        // CONVERSÕES PARA JSON
        this.legislacao.tipoLegislacao = Number(this.legislacao.tipoLegislacao);
        this.legislacao.numero = Number(this.legislacao.numero);
        if (this.legislacao.emenda) { this.legislacao.emenda = Number(this.legislacao.emenda); } else { this.legislacao.emenda = null; }
        if (this.legislacao.dataEmenda) { this.legislacao.dataEmenda = new Date(this.legislacao.dataEmenda); } else { this.legislacao.dataEmenda = null; }
        // FIM DAS CONVERSÕES

        console.log(this.legislacao);

        this.legislacaoService.novoLegislacao(this.legislacao)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.legislacaoForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Legislação cadastrada com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/legislacoes/listar-todos']);
          });
        }
      }
      
      processarFalha(fail: any) {
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Opa...');
      }
    }