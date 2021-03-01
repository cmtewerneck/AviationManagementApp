import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ManualEmpresaService } from '../services/manualEmpresa.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManualEmpresaBaseComponent } from '../manualEmpresa-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends ManualEmpresaBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private manualEmpresaService: ManualEmpresaService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.manualEmpresa = this.route.snapshot.data['manualEmpresa'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.manualEmpresaForm = this.fb.group({
        descricao: ['', [Validators.required, Validators.maxLength(50)]],
        sigla: ['', [Validators.required, Validators.maxLength(10)]],
        revisaoAtual: ['', [Validators.required]],
        dataRevisao: ['', [Validators.required]],
        revisaoAnalise: [''],
        arquivo: ['']
      });
      
      this.manualEmpresaForm.patchValue({
        id: this.manualEmpresa.id,
        descricao: this.manualEmpresa.descricao,
        sigla: this.manualEmpresa.sigla,
        revisaoAtual: this.manualEmpresa.revisaoAtual,
        dataRevisao: this.manualEmpresa.dataRevisao,
        revisaoAnalise: this.manualEmpresa.revisaoAnalise,
      });
      
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    editarManualEmpresa() {
      if (this.manualEmpresaForm.dirty && this.manualEmpresaForm.valid) {
        this.manualEmpresa = Object.assign({}, this.manualEmpresa, this.manualEmpresaForm.value);
        
        // Implementar edição do arquivo pdf
        
        this.manualEmpresaService.atualizarManualEmpresa(this.manualEmpresa)
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
        
        let toast = this.toastr.success('Manual editado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/manuais-empresa/listar-todos']);
          });
        }
      }
      
      processarFalha(fail: any) {
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Opa :(');
      }
    }