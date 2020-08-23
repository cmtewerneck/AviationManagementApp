import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() { if (localStorage.getItem('token') !== null) {this.router.navigate(['']);} }

  login() {
    console.log(this.model);
    this.authService.login(this.model)
      .subscribe(
        () => {
          this.router.navigate(['']);
          this.toastr.success('Você está ONLINE!');
        },
        error => {
          this.toastr.error('Falha ao tentar logar. Confirme seus dados de acesso.');
        }
      )
    }
  }
