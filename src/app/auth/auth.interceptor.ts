import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { LocalStorageUtils } from '../utils/localStorage';
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    localStorageUtil = new LocalStorageUtils();

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //     return next.handle(req).pipe(catchError(error => {
    //     if (error instanceof HttpErrorResponse) {
    //         if (error.status === 401) {
    //             this.localStorageUtil.limparDadosLocaisUsuario();
    //             this.router.navigate(['/conta/login'], { queryParams: { returnUrl: this.router.url }});
    //         }
    //         if (error.status === 403) {
    //             this.router.navigate(['/acesso-negado']);
    //         }
    //     }
    //     return throwError(error);
    //     }));
    // }

    // MÉTODO ANTERIOR. O DE CIMA É DO EDUARDO!!
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('token') !== null){
            const cloneReq = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
            });

            return next.handle(cloneReq).pipe(
                tap(
                    succ => {},
                    err => {
                        if(err.status === 401) {
                          this.router.navigate(['/conta/login'], { queryParams: { returnUrl: this.router.url }});
                        }
                    }
                )
            );
        } else {
            return next.handle(request.clone());
        }
    }
}