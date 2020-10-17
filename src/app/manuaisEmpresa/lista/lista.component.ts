import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ManualEmpresa } from '../models/ManualEmpresa';
import { ManualEmpresaService } from '../services/manualEmpresa.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public manuaisEmpresa: ManualEmpresa[];
  errorMessage: string;

  manualEmpresa: ManualEmpresa;
  manuaisEmpresaFiltrados: ManualEmpresa[];

  constructor(private manualEmpresaService: ManualEmpresaService,
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
    this.manuaisEmpresaFiltrados = this.filtroLista ? this.filtrarManualEmpresa(this.filtroLista) : this.manuaisEmpresa;
  }

  filtrarManualEmpresa(filtrarPor: string): ManualEmpresa[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.manuaisEmpresa.filter(
      manual => manual.sigla.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.manualEmpresaService.obterTodos().subscribe(
      (_manuaisEmpresa: ManualEmpresa[]) => {
      this.manuaisEmpresa = _manuaisEmpresa;
      this.manuaisEmpresaFiltrados = this.manuaisEmpresa;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
