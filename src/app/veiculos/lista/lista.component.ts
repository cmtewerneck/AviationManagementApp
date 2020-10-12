import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Veiculo } from '../models/Veiculo';
import { VeiculoService } from '../services/veiculo.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  imagens: string = environment.imagensUrl;

  public veiculos: Veiculo[];
  errorMessage: string;
  mostrarImagem = true;

  veiculo: Veiculo;
  veiculosFiltrados: Veiculo[];

  constructor(private veiculoService: VeiculoService,
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
    this.veiculosFiltrados = this.filtroLista ? this.filtrarVeiculo(this.filtroLista) : this.veiculos;
  }

  filtrarVeiculo(filtrarPor: string): Veiculo[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.veiculos.filter(
      veiculo => veiculo.placa.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  ObterTodos() {
    this.veiculoService.obterTodos().subscribe(
      (_veiculos: Veiculo[]) => {
      this.veiculos = _veiculos;
      this.veiculosFiltrados = this.veiculos;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
