import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OficioRecebidoService } from '../services/oficioRecebido.service';
import { OficioRecebidoBaseComponent } from '../OficioRecebido-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends OficioRecebidoBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private oficioRecebidoService: OficioRecebidoService,
              private router: Router,
              private toastr: ToastrService) { super(); }

  ngOnInit(): void {
     this.oficioRecebidoForm = this.fb.group({
       data: ['', [Validators.required]],
       assunto: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
       numeracao: ['', [Validators.required]],
       remetente: ['', [Validators.required]],
       arquivo: [''],
       situacao: [true]
     });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarOficioRecebido() {
    if (this.oficioRecebidoForm.dirty && this.oficioRecebidoForm.valid) {
      this.oficioRecebido = Object.assign({}, this.oficioRecebido, this.oficioRecebidoForm.value);

      // this.formResult = JSON.stringify(this.produto);

      this.oficioRecebidoService.novoOficioRecebido(this.oficioRecebido)
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

    let toast = this.toastr.success('Ofício cadastrado com sucesso!', 'Sucesso!');
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

