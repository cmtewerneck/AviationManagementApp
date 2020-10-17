import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AeronaveAbastecimento } from '../models/AeronaveAbastecimento';
import { AeronaveAbastecimentoService } from '../services/aeronaveAbastecimento.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public aeronavesAbastecimentos: AeronaveAbastecimento[];
  errorMessage: string;

  aeronaveAbastecimento: AeronaveAbastecimento;
  aeronavesAbastecimentosFiltrados: AeronaveAbastecimento[];

  constructor(private aeronaveAbastecimentoService: AeronaveAbastecimentoService,
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
    this.aeronavesAbastecimentosFiltrados = this.filtroLista ? this.filtrarAeronaveAbastecimento(this.filtroLista) : this.aeronavesAbastecimentos;
  }

  filtrarAeronaveAbastecimento(filtrarPor: string): AeronaveAbastecimento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.aeronavesAbastecimentos.filter(
      aeronaveAbastecimento => aeronaveAbastecimento.matriculaAeronave.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.aeronaveAbastecimentoService.obterTodos().subscribe(
      (_aeronavesAbastecimentos: AeronaveAbastecimento[]) => {
      this.aeronavesAbastecimentos = _aeronavesAbastecimentos;
      this.aeronavesAbastecimentosFiltrados = this.aeronavesAbastecimentos;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
