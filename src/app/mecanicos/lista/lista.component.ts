import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Mecanico } from '../models/Mecanico';
import { MecanicoService } from '../services/mecanico.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  imagens: string = environment.imagensUrl;

  mostrarImagem = true;

  public mecanicos: Mecanico[];
  errorMessage: string;

  mecanico: Mecanico;
  mecanicosFiltrados: Mecanico[];

  constructor(private mecanicoService: MecanicoService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ObterTodos();
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.mecanicosFiltrados = this.filtroLista ? this.filtrarMecanico(this.filtroLista) : this.mecanicos;
  }

  filtrarMecanico(filtrarPor: string): Mecanico[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.mecanicos.filter(
      mecanico => mecanico.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.mecanicoService.obterTodos().subscribe(
      (_mecanicos: Mecanico[]) => {
      this.mecanicos = _mecanicos;
      this.mecanicosFiltrados = this.mecanicos;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
