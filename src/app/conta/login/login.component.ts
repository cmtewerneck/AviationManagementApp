import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/conta/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  model: any = {};
  loginForm: FormGroup;
  errors: any[] = [];
  user: User;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['']);
    }
    this.validation();
  }

  validation() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.user = Object.assign({}, this.user, this.loginForm.value);

      this.authService.login(this.user)
        .subscribe(
          success => { this.processarSucesso(success); },
          error => { this.processarFalha(error); }
        );
    }
  }

  processarSucesso(response: any) {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'];
    if (returnUrl)
      this.router.navigate([returnUrl]);
    else
      this.router.navigate(['']);

    this.toastr.success('Você está Online!', 'ACESSO PERMITIDO', {
      closeButton: true,
      progressBar: true,
      timeOut: 2000
    });

    this.errors = [];

    this.authService.LocalStorage.salvarDadosLocaisUsuario(response);
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
  }
}
