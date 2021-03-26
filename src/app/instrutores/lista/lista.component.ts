import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Instrutor } from '../models/Instrutor';
import { InstrutorService } from '../services/instrutor.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  imagens: string = environment.imagensUrl;

  mostrarImagem = false;

  public instrutores: Instrutor[];
  errorMessage: string;

  instrutor: Instrutor;
  instrutoresFiltrados: Instrutor[];

  constructor(private instrutorService: InstrutorService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ObterTodos();
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.instrutoresFiltrados = this.filtroLista ? this.filtrarInstrutor(this.filtroLista) : this.instrutores;
  }

  filtrarInstrutor(filtrarPor: string): Instrutor[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.instrutores.filter(
      instrutor => instrutor.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.instrutorService.obterTodos(3).subscribe(
      (_instrutores: Instrutor[]) => {
      this.instrutores = _instrutores;
      this.instrutoresFiltrados = this.instrutores;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
