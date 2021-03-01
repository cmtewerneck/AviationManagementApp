import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VeiculoMulta } from '../models/veiculoMulta';
import { VeiculoMultaService } from '../services/veiculoMulta.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  public veiculosMultas: VeiculoMulta[];
  errorMessage: string;
  
  veiculoMulta: VeiculoMulta;
  veiculosMultasFiltrados: VeiculoMulta[];
  
  constructor(private veiculoMultaService: VeiculoMultaService,
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
      this.veiculosMultasFiltrados = this.filtroLista ? this.filtrarVeiculoMulta(this.filtroLista) : this.veiculosMultas;
    }
    
    filtrarVeiculoMulta(filtrarPor: string): VeiculoMulta[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.veiculosMultas.filter(
        veiculoMulta => veiculoMulta.autoInfracao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
      ObterTodos() {
        this.veiculoMultaService.obterTodos().subscribe(
          (_veiculosMultas: VeiculoMulta[]) => {
            this.veiculosMultas = _veiculosMultas;
            this.veiculosMultasFiltrados = this.veiculosMultas;
          }, error => {
            this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
            console.log(error);
          });
        }
      }
      