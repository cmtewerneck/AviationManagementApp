import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Aeronave } from '../models/Aeronave';
import { AeronaveService } from '../services/aeronave.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  imagens: string = environment.imagensUrl;

  public aeronaves: Aeronave[];
  errorMessage: string;
  mostrarImagem = true;

  aeronave: Aeronave;
  aeronavesFiltrados: Aeronave[];

  constructor(private aeronaveService: AeronaveService,
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
    this.aeronavesFiltrados = this.filtroLista ? this.filtrarAeronave(this.filtroLista) : this.aeronaves;
  }

  filtrarAeronave(filtrarPor: string): Aeronave[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.aeronaves.filter(
      aeronave => aeronave.matricula.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  ObterTodos() {
    this.aeronaveService.obterTodos().subscribe(
      (_aeronaves: Aeronave[]) => {
      this.aeronaves = _aeronaves;
      this.aeronavesFiltrados = this.aeronaves;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
