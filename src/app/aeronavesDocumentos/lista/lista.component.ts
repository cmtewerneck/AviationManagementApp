import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AeronaveDocumento } from '../models/AeronaveDocumento';
import { AeronaveDocumentoService } from '../services/aeronaveDocumento.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  aeronavesDocumentos: AeronaveDocumento[];
  errorMessage: string;

  aeronaveDocumento: AeronaveDocumento;
  aeronavesDocumentosFiltrados: AeronaveDocumento[];

  constructor(private aeronaveDocumentoService: AeronaveDocumentoService,
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
    this.aeronavesDocumentosFiltrados = this.filtroLista ? this.filtrarAeronaveDocumento(this.filtroLista) : this.aeronavesDocumentos;
  }

  filtrarAeronaveDocumento(filtrarPor: string): AeronaveDocumento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.aeronavesDocumentos.filter(
      aeronaveDocumento => aeronaveDocumento.matriculaAeronave.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.aeronaveDocumentoService.obterTodos().subscribe(
      (_aeronavesDocumentos: AeronaveDocumento[]) => {
      this.aeronavesDocumentos = _aeronavesDocumentos;
      this.aeronavesDocumentosFiltrados = this.aeronavesDocumentos;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
