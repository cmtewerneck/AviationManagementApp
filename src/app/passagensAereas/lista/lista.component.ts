import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PassagemAerea } from '../models/PassagemAerea';
import { PassagemAereaService } from '../services/passagemAerea.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  passagensAereas: PassagemAerea[];
  errorMessage: string;

  passagemAerea: PassagemAerea;
  passagensAereasFiltradas: PassagemAerea[];

  constructor(private passagemAereaService: PassagemAereaService,
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
    this.passagensAereasFiltradas = this.filtroLista ? this.filtrarPassagemAerea(this.filtroLista) : this.passagensAereas;
  }

  filtrarPassagemAerea(filtrarPor: string): PassagemAerea[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.passagensAereas.filter(
      passagemAerea => passagemAerea.empresa.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.passagemAereaService.obterTodos().subscribe(
      (_passagensAereas: PassagemAerea[]) => {
      this.passagensAereas = _passagensAereas;
      this.passagensAereasFiltradas = this.passagensAereas;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
