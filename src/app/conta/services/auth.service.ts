import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/User';
import { BaseService } from '../../_services/base.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService extends BaseService {

  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { super(); }

  // login(user: User) {
  //   return this.http
  //     .post(this.urlServiceV1 + 'entrar', user, this.obterHeaderJson())
  //     .pipe(
  //       map((response: any) => {
  //         const user = response;
  //         if (user) {
  //           localStorage.setItem('token', user.data.accessToken);
  //           this.decodedToken = this.jwtHelper.decodeToken(user.data.accessToken);
  //         }
  //       })
  //   );
  // }

  //Eduardo Pires Login
  login(user: User): Observable<User>{
    return this.http
      .post(this.urlServiceV1 + 'entrar', user, this.obterHeaderJson())
      .pipe(
          map(this.extractData),
          catchError(this.serviceError)
    );
  }

  register(user: User): Observable<User>{
    return this.http
      .post(this.urlServiceV1 + 'nova-conta', user, this.obterHeaderJson())
      .pipe(
          map(this.extractData),
          catchError(this.serviceError)
    );
  }

  usuarioLogado() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
