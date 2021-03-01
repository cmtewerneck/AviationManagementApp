import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VeiculoGasto } from '../models/VeiculoGasto';
import { VeiculoGastoService } from '../services/veiculoGasto.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  public veiculosGastos: VeiculoGasto[];
  errorMessage: string;
  
  veiculoGasto: VeiculoGasto;
  veiculosGastosFiltrados: VeiculoGasto[];
  
  constructor(private veiculoGastoService: VeiculoGastoService,
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
      this.veiculosGastosFiltrados = this.filtroLista ? this.filtrarVeiculoGasto(this.filtroLista) : this.veiculosGastos;
    }
    
    filtrarVeiculoGasto(filtrarPor: string): VeiculoGasto[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.veiculosGastos.filter(
        veiculoGasto => veiculoGasto.placaVeiculo.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
      ObterTodos() {
        this.veiculoGastoService.obterTodos().subscribe(
          (_veiculosGastos: VeiculoGasto[]) => {
            this.veiculosGastos = _veiculosGastos;
            this.veiculosGastosFiltrados = this.veiculosGastos;
          }, error => {
            this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
            console.log(error);
          });
        }
      }