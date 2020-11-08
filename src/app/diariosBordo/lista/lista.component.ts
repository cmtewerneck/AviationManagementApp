import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DiarioBordo } from '../models/DiarioBordo';
import { DiarioBordoService } from '../services/diarioBordo.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public diariosBordo: DiarioBordo[];
  errorMessage: string;

  diarioBordo: DiarioBordo;
  diariosBordoFiltrados: DiarioBordo[];

  constructor(private diarioBordoService: DiarioBordoService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ObterTodos();
  }

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.diariosBordoFiltrados = this.filtroLista ? this.filtrarDiarioBordo(this.filtroLista) : this.diariosBordo;
  }

  filtrarDiarioBordo(filtrarPor: string): DiarioBordo[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.diariosBordo.filter(
      diarioBordo => diarioBordo.matricula.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.diarioBordoService.obterTodos().subscribe(
      (_diariosBordo: DiarioBordo[]) => {
      this.diariosBordo = _diariosBordo;
      this.diariosBordoFiltrados = this.diariosBordo;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
