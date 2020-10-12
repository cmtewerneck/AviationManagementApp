import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../services/cliente.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteBaseComponent } from '../cliente-form.base.component';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends ClienteBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private clienteService: ClienteService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {

      super();
      this.cliente = this.route.snapshot.data['cliente'];
    }
    
    ngOnInit(): void {

      this.spinner.show();

      this.clienteForm = this.fb.group({
        primeiroNome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
        ultimoNome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
        cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
        email: ['', [Validators.email]],
        telefone: ['']
      });

      this.clienteForm.patchValue({
        id: this.cliente.id,
        primeiroNome: this.cliente.primeiroNome,
        ultimoNome: this.cliente.ultimoNome,
        cpf: this.cliente.cpf,
        email: this.cliente.email,
        telefone: this.cliente.telefone
        });

      setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      editarCliente() {
        if (this.clienteForm.dirty && this.clienteForm.valid) {
          this.cliente = Object.assign({}, this.cliente, this.clienteForm.value);
          this.cliente.cpf = StringUtils.somenteNumeros(this.cliente.cpf);

          this.clienteService.EditarCliente(this.cliente)
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

          let toast = this.toastr.success('Cliente editado com sucesso!', 'Sucesso!');
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