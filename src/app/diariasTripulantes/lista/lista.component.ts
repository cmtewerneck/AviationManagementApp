import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DiariaTripulante } from '../models/DiariaTripulante';
import { DiariaTripulanteService } from '../services/diariaTripulante.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  diariasTripulantes: DiariaTripulante[];
  errorMessage: string;

  diariaTripulante: DiariaTripulante;
  diariasTripulantesFiltradas: DiariaTripulante[];

  constructor(private diariaTripulanteService: DiariaTripulanteService,
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
    this.diariasTripulantesFiltradas = this.filtroLista ? this.filtrarDiariaTripulante(this.filtroLista) : this.diariasTripulantes;
  }

  filtrarDiariaTripulante(filtrarPor: string): DiariaTripulante[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.diariasTripulantes.filter(
      diariaTripulante => diariaTripulante.finalidade.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.diariaTripulanteService.obterTodos().subscribe(
      (_diariasTripulantes: DiariaTripulante[]) => {
      this.diariasTripulantes = _diariasTripulantes;
      this.diariasTripulantesFiltradas = this.diariasTripulantes;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
