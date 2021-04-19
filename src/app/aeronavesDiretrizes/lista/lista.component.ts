import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AeronaveDiretriz } from '../models/AeronaveDiretriz';
import { AeronaveDiretrizService } from '../services/aeronaveDiretriz.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  aeronavesDiretrizes: AeronaveDiretriz[];
  errorMessage: string;

  aeronaveDiretriz: AeronaveDiretriz;
  aeronavesDiretrizesFiltrados: AeronaveDiretriz[];

  constructor(private aeronaveDiretrizService: AeronaveDiretrizService,
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
    this.aeronavesDiretrizesFiltrados = this.filtroLista ? this.filtrarAeronaveDiretriz(this.filtroLista) : this.aeronavesDiretrizes;
  }

  filtrarAeronaveDiretriz(filtrarPor: string): AeronaveDiretriz[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.aeronavesDiretrizes.filter(
      aeronaveDiretriz => aeronaveDiretriz.matriculaAeronave.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.aeronaveDiretrizService.obterTodos().subscribe(
      (_aeronavesDiretrizes: AeronaveDiretriz[]) => {
      this.aeronavesDiretrizes = _aeronavesDiretrizes;
      this.aeronavesDiretrizesFiltrados = this.aeronavesDiretrizes;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
