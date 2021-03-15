import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../services/fornecedor.service';
import { Fornecedor } from '../models/Fornecedor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html'
})
export class FornecedoresComponent implements OnInit {
  
  public fornecedores: Fornecedor[];
  errorMessage: string;
  errors: any[] = [];
  
  fornecedor: Fornecedor;
  fornecedoresFiltrados: Fornecedor[];
  
  constructor(
    private fornecedorService: FornecedorService,
    private toastr: ToastrService) {}
    
    ngOnInit(): void {
      this.ObterTodos();
    }
    
    _filtroLista: string;
    get filtroLista(): string {
      return this._filtroLista;
    }
    set filtroLista(value: string) {
      this._filtroLista = value;
      this.fornecedoresFiltrados = this.filtroLista ? this.filtrarFornecedor(this.filtroLista) : this.fornecedores;
    }
    
    filtrarFornecedor(filtrarPor: string): Fornecedor[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.fornecedores.filter(
        fornecedor => fornecedor.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
      ObterTodos() {
        this.fornecedorService.ObterTodos().subscribe(
          (_fornecedores: Fornecedor[]) => {
            this.fornecedores = _fornecedores;
            this.fornecedoresFiltrados = this.fornecedores;
          }, error => {
            this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
            console.log(error);
          });
        }
}