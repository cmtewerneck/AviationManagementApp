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
          mensagem: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
          assunto: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
          numeracao: ['', [Validators.required]],
          responsavel: [''],
          destinatario: ['', [Validators.required]],
          arquivo: ['']
      });

      this.oficioEmitidoForm.patchValue({
          id: this.oficioEmitido.id,
          data: this.oficioEmitido.data,
          mensagem: this.oficioEmitido.mensagem,
          assunto: this.oficioEmitido.assunto,
          numeracao: this.oficioEmitido.numeracao,
          responsavel: this.oficioEmitido.responsavel,
          destinatario: this.oficioEmitido.destinatario,
          arquivo: this.oficioEmitido.arquivo
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