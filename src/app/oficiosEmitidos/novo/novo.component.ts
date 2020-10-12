import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OficioEmitidoService } from '../services/oficioEmitido.service';
import { OficioEmitidoBaseComponent } from '../oficioEmitido-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends OficioEmitidoBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private oficioEmitidoService: OficioEmitidoService,
              private router: Router,
              private toastr: ToastrService) { super(); }

  ngOnInit(): void {
     this.oficioEmitidoForm = this.fb.group({
       data: ['', [Validators.required]],
       mensagem: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
       assunto: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
       numeracao: ['', [Validators.required]],
       responsavel: [''],
       destinatario: ['', [Validators.required]],
       arquivo: ['']
     });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarOficioEmitido() {
    if (this.oficioEmitidoForm.dirty && this.oficioEmitidoForm.valid) {
      this.oficioEmitido = Object.assign({}, this.oficioEmitido, this.oficioEmitidoForm.value);

      // this.formResult = JSON.stringify(this.produto);

      this.oficioEmitidoService.novoOficioEmitido(this.oficioEmitido)
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

    let toast = this.toastr.success('Ofício cadastrado com sucesso!', 'Sucesso!');
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

