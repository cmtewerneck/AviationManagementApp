import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ManualVoo } from '../models/ManualVoo';
import { ManualVooService } from '../services/manualVoo.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  public manuaisVoo: ManualVoo[];
  errorMessage: string;
  
  manualVoo: ManualVoo;
  manuaisVooFiltrados: ManualVoo[];
  
  constructor(private manualVooService: ManualVooService,
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
      this.manuaisVooFiltrados = this.filtroLista ? this.filtrarManualVoo(this.filtroLista) : this.manuaisVoo;
    }
    
    filtrarManualVoo(filtrarPor: string): ManualVoo[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.manuaisVoo.filter(
        manual => manual.modeloAeronave.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
      ObterTodos() {
        this.manualVooService.obterTodos().subscribe(
          (_manuaisVoo: ManualVoo[]) => {
            this.manuaisVoo = _manuaisVoo;
            this.manuaisVooFiltrados = this.manuaisVoo;
          }, error => {
            this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
            console.log(error);
          });
        }
      }
      