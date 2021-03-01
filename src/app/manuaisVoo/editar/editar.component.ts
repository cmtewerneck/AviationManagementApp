import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ManualVooService } from '../services/manualVoo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManualVooBaseComponent } from '../manualVoo-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends ManualVooBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private manualVooService: ManualVooService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.manualVoo = this.route.snapshot.data['manualVoo'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.manualVooForm = this.fb.group({
        modeloAeronave: ['', [Validators.required, Validators.maxLength(20)]],
        ultimaRevisao: [''],
        arquivo: ['']
      });
      
      this.manualVooForm.patchValue({
        id: this.manualVoo.id,
        modeloAeronave: this.manualVoo.modeloAeronave,
        ultimaRevisao: this.manualVoo.ultimaRevisao
      });
      
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    editarManualVoo() {
      if (this.manualVooForm.dirty && this.manualVooForm.valid) {
        this.manualVoo = Object.assign({}, this.manualVoo, this.manualVooForm.value);
        
        // Implementar upload de arquivo pdf
        
        this.manualVooService.atualizarManualVoo(this.manualVoo)
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
        
        let toast = this.toastr.success('Manual editado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/manuais-voo/listar-todos']);
          });
        }
      }
      
      processarFalha(fail: any) {
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Opa :(');
      }
    }