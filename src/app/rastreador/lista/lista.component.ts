import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Rastreador } from '../models/Rastreador';
import { RastreadorService } from '../services/rastreador.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public rastreadores: Rastreador[];
  errorMessage: string;

  rastreador: Rastreador;
  rastreadoresFiltrados: Rastreador[];

  constructor(private rastreadorService: RastreadorService,
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
    this.rastreadoresFiltrados = this.filtroLista ? this.filtrarRastreador(this.filtroLista) : this.rastreadores;
  }

  filtrarRastreador(filtrarPor: string): Rastreador[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.rastreadores.filter(
      rastreador => rastreador.matriculaAeronave.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.rastreadorService.obterTodos().subscribe(
      (_rastreadores:Rastreador[]) => {
      this.rastreadores = _rastreadores;
      this.rastreadoresFiltrados = this.rastreadores;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
