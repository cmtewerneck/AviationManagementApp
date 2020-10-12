import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../services/cliente.service';
import { ClienteBaseComponent } from '../cliente-form.base.component';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends ClienteBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private clienteService: ClienteService,
              private router: Router,
              private toastr: ToastrService) {super();}

  ngOnInit(): void {
     this.clienteForm = this.fb.group({
       primeiroNome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
       ultimoNome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
       cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
       email: ['', [Validators.email]],
       telefone: ['']
     });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarCliente() {
    if (this.clienteForm.dirty && this.clienteForm.valid) {
      this.cliente = Object.assign({}, this.cliente, this.clienteForm.value);
      this.cliente.cpf = StringUtils.somenteNumeros(this.cliente.cpf);

      this.clienteService.AdicionarCliente(this.cliente)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.clienteForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Cliente cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/clientes/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}

