import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ManualEmpresaService } from '../services/manualEmpresa.service';
import { ManualEmpresaBaseComponent } from '../manualEmpresa-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends ManualEmpresaBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private manualEmpresaService: ManualEmpresaService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
      
      this.manualEmpresaForm = this.fb.group({
        descricao: ['', [Validators.required, Validators.maxLength(50)]],
        sigla: ['', [Validators.required, Validators.maxLength(10)]],
        revisaoAtual: ['', [Validators.required]],
        dataRevisao: ['', [Validators.required]],
        revisaoAnalise: [''],
        arquivo: ['']
      });
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    adicionarManualEmpresa() {
      if (this.manualEmpresaForm.dirty && this.manualEmpresaForm.valid) {
        this.manualEmpresa = Object.assign({}, this.manualEmpresa, this.manualEmpresaForm.value);
        
        // IMPLEMENTAR UPLOAD DO ARQUIVO PDF DO MANUAL
        
        // CONVERSÕES PARA JSON
        this.manualEmpresa.revisaoAtual = Number(this.manualEmpresa.revisaoAtual);
        this.manualEmpresa.dataRevisao = new Date(this.manualEmpresa.dataRevisao);
        if (this.manualEmpresa.revisaoAnalise) { this.manualEmpresa.revisaoAnalise = Number(this.manualEmpresa.revisaoAnalise); } else { this.manualEmpresa.revisaoAnalise = null; }
        // FIM DAS CONVERSÕES

        console.log(this.manualEmpresa);

        this.manualEmpresaService.novoManualEmpresa(this.manualEmpresa)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.manualEmpresaForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Manual cadastrado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/manuais-empresa/listar-todos']);
          });
        }
      }
      
      processarFalha(fail: any) {
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Opa...');
      }
    } 