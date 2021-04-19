import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VooAgendado } from '../models/VooAgendado';
import { VooAgendadoService } from '../services/vooAgendado.service';

@Component({
  selector: 'app-listaGrid',
  templateUrl: './listaGrid.component.html'
})
export class ListaGridComponent implements OnInit {

  voosAgendados: VooAgendado[];
  errorMessage: string;

  vooAgendado: VooAgendado;
  voosAgendadosFiltrados: VooAgendado[];

  constructor(private vooAgendadoService: VooAgendadoService,
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
    this.voosAgendadosFiltrados = this.filtroLista ? this.filtrarVooAgendado(this.filtroLista) : this.voosAgendados;
  }

  filtrarVooAgendado(filtrarPor: string): VooAgendado[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.voosAgendados.filter(
      vooAgendado => vooAgendado.matriculaAeronave.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.vooAgendadoService.obterTodos().subscribe(
      (_voosAgendados: VooAgendado[]) => {
      this.voosAgendados = _voosAgendados;
      this.voosAgendadosFiltrados = this.voosAgendados;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
