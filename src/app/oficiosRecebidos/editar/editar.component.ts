import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OficioRecebidoService } from '../services/oficioRecebido.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OficioRecebidoBaseComponent } from '../OficioRecebido-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends OficioRecebidoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private oficioRecebidoService: OficioRecebidoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.oficioRecebido = this.route.snapshot.data['oficioRecebido'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.oficioRecebidoForm = this.fb.group({
        data: ['', [Validators.required]],
        numeracao: ['', [Validators.required, Validators.maxLength(20)]],
        assunto: ['', [Validators.required, Validators.maxLength(50)]],
        remetente: ['', [Validators.required, Validators.maxLength(20)]],
        arquivo: ['']
      });
      
      this.oficioRecebidoForm.patchValue({
        id: this.oficioRecebido.id,
        data: this.oficioRecebido.data,
        numeracao: this.oficioRecebido.numeracao,
        assunto: this.oficioRecebido.assunto,
        remetente: this.oficioRecebido.remetente
      });
      
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    editarOficioRecebido() {
      if (this.oficioRecebidoForm.dirty && this.oficioRecebidoForm.valid) {
        this.oficioRecebido = Object.assign({}, this.oficioRecebido, this.oficioRecebidoForm.value);
        
        // Implementar upload de arquivo pdf
        
        this.oficioRecebidoService.atualizarOficioRecebido(this.oficioRecebido)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.oficioRecebidoForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Ofício editado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/oficios-recebidos/listar-todos']);
          });
        }
      }
      
      processarFalha(fail: any) {
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Opa :(');
      }
    }