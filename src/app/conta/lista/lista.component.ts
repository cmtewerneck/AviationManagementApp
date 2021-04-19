import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  users: User[];
  errors: any[] = [];
  errorMessage: string;
  
  user: User;
  usersFiltrados: User[];
  
  constructor(private authService: AuthService,
    private toastr: ToastrService) { }
    
    ngOnInit(): void {
      //this.ObterTodos();
    }
    
    openModal(template: any, id: string) {
      template.show();
    }
    
    _filtroLista: string;
    get filtroLista(): string {
      return this._filtroLista;
    }
    set filtroLista(value: string) {
      this._filtroLista = value;
      this.usersFiltrados = this.filtroLista ? this.filtrarUser(this.filtroLista) : this.users;
    }
    
    filtrarUser(filtrarPor: string): User[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.users.filter(
        user => user.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
        // }
        
        // ObterTodos() {
        //   this.authService.obterTodos().subscribe(
        //     (_users: User[]) => {
        //     this.users = _users;
        //     this.usersFiltrados = this.users;
        //   }, error => {
        //       this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        //       console.log(error);
        //   });
        // }
        
      }
    }
    