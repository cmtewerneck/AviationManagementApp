import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AeronaveTarifa } from '../models/AeronaveTarifa';
import { AeronaveTarifaService } from '../services/aeronaveTarifa.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public aeronavesTarifas: AeronaveTarifa[];
  errorMessage: string;

  aeronaveTarifa: AeronaveTarifa;
  aeronavesTarifasFiltrados: AeronaveTarifa[];

  constructor(private aeronaveTarifaService: AeronaveTarifaService,
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
    this.aeronavesTarifasFiltrados = this.filtroLista ? this.filtrarAeronaveTarifa(this.filtroLista) : this.aeronavesTarifas;
  }

  filtrarAeronaveTarifa(filtrarPor: string): AeronaveTarifa[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.aeronavesTarifas.filter(
      aeronaveTarifa => aeronaveTarifa.matriculaAeronave.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.aeronaveTarifaService.obterTodos().subscribe(
      (_aeronavesTarifas: AeronaveTarifa[]) => {
      this.aeronavesTarifas = _aeronavesTarifas;
      this.aeronavesTarifasFiltrados = this.aeronavesTarifas;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
