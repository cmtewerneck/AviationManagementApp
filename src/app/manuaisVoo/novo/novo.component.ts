import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ManualVooService } from '../services/manualVoo.service';
import { ManualVooBaseComponent } from '../manualVoo-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends ManualVooBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private manualVooService: ManualVooService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
      
      this.manualVooForm = this.fb.group({
        modeloAeronave: ['', [Validators.required, Validators.maxLength(20)]],
        ultimaRevisao: [''],
        arquivo: ['']
      });
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    adicionarManualVoo() {
      if (this.manualVooForm.dirty && this.manualVooForm.valid) {
        this.manualVoo = Object.assign({}, this.manualVoo, this.manualVooForm.value);
        
        // Implementar o upload do arquivo pdf

        // CONVERSÕES PARA JSON
        if (this.manualVoo.ultimaRevisao) { this.manualVoo.ultimaRevisao = new Date(this.manualVoo.ultimaRevisao); } else { this.manualVoo.ultimaRevisao = null; }
        // FIM DAS CONVERSÕES

        console.log(this.manualVoo);
        
        this.manualVooService.novoManualVoo(this.manualVoo)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.manualVooForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Manual cadastrado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/manuais-voo/listar-todos']);
          });
        }
      }
      
      processarFalha(fail: any) {
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Opa...');
      }
    }  