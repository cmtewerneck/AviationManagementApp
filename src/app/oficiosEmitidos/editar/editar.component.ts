import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OficioEmitidoService } from '../services/oficioEmitido.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OficioEmitidoBaseComponent } from '../oficioEmitido-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends OficioEmitidoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private oficioEmitidoService: OficioEmitidoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.oficioEmitido = this.route.snapshot.data['oficioEmitido'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.oficioEmitidoForm = this.fb.group({
        data: ['', [Validators.required]],
        numeracao: ['', [Validators.required, Validators.maxLength(20)]],
        mensagem: ['', [Validators.required, Validators.maxLength(1000)]],
        responsavel: ['', Validators.maxLength(20)],
        destinatario: ['', [Validators.required, Validators.maxLength(20)]],
        assunto: ['', [Validators.required, Validators.maxLength(50)]],
        arquivo: ['']
      });
      
      this.oficioEmitidoForm.patchValue({
        id: this.oficioEmitido.id,
        data: this.oficioEmitido.data,
        numeracao: this.oficioEmitido.numeracao,
        mensagem: this.oficioEmitido.mensagem,
        responsavel: this.oficioEmitido.responsavel,
        destinatario: this.oficioEmitido.destinatario,
        assunto: this.oficioEmitido.assunto
      });
      
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    editarOficioEmitido() {
      if (this.oficioEmitidoForm.dirty && this.oficioEmitidoForm.valid) {
        this.oficioEmitido = Object.assign({}, this.oficioEmitido, this.oficioEmitidoForm.value);
        
        // CONVERSÕES PARA JSON
        this.oficioEmitido.data = new Date(this.oficioEmitido.data);
        // FIM DAS CONVERSÕES

        console.log(this.oficioEmitido);
        
        this.oficioEmitidoService.atualizarOficioEmitido(this.oficioEmitido)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.oficioEmitidoForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Ofício editado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/oficios-emitidos/listar-todos']);
          });
        }
      }
      
      processarFalha(fail: any) {
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Opa :(');
      }
    }