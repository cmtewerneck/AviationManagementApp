import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/conta/models/User';
import { AuthService } from 'src/app/conta/services/auth.service';
import { Router } from '@angular/router';
import { ValidationMessages, GenericValidator, DisplayMessage } from '../../utils/generic-form-validation';
import { fromEvent, merge, Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  registerForm: FormGroup;
  user: User;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  mudancasNaoSalvas: boolean;

  constructor(public fb: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.validation();
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.registerForm);
      this.mudancasNaoSalvas = true;
    })
  }

  validation() {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(30)]],
      sobrenome: ['', [Validators.required, Validators.maxLength(100)]],
      telefone: ['', Validators.maxLength(20)],
      empresa: ['', [Validators.required, Validators.maxLength(100)]],
      empresaCnpj: ['', [Validators.required, Validators.maxLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      }, { validator : this.compararSenhas })
    });
  }

  compararSenhas(fb: FormGroup) {
    const confirmarSenhaCtrl = fb.get('confirmPassword');
    if (confirmarSenhaCtrl.errors == null || 'mismatch' in confirmarSenhaCtrl.errors) {
      if (fb.get('password').value !== confirmarSenhaCtrl.value){
        confirmarSenhaCtrl.setErrors({ mismatch: true});
      } else {
        confirmarSenhaCtrl.setErrors(null);
      }
    }
  }

  cadastrarUsuario() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      this.user = Object.assign({password: this.registerForm.get('passwords.password').value},
      {confirmPassword: this.registerForm.get('passwords.confirmPassword').value},
      this.registerForm.value);
        console.log(this.user);
      this.authService.register(this.user).subscribe(
        success => { this.processarSucesso(success); },
        error => {
          this.processarFalha(error);
          const erro = error.error;
          erro.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Nome de usuário já cadastrado!');
                break;
                default:
                  this.toastr.error(`Erro no cadastro! CODE: ${element.code}`);
                  break;
            }
          });
        }
      );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.toastr.success('Cadastro realizado com sucesso', 'Parabéns!');
    this.errors = [];

    this.authService.LocalStorage.salvarDadosLocaisUsuario(response);

    this.router.navigate(['/dashboard']);
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
  }

}
