import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = 'https://localhost:44302/api/v1/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(`${this.baseURL}entrar`, model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          console.log(user);
          localStorage.setItem('token', user.data.accessToken);
          this.decodedToken = this.jwtHelper.decodeToken(user.data.accessToken);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(`${this.baseURL}nova-conta`, model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
