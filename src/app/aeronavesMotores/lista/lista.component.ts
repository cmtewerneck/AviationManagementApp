import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AeronaveMotor } from '../models/AeronaveMotor';
import { AeronaveMotorService } from '../services/aeronaveMotor.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  aeronavesMotores: AeronaveMotor[];
  errorMessage: string;

  aeronaveMotor: AeronaveMotor;
  aeronavesMotoresFiltrados: AeronaveMotor[];

  constructor(private aeronaveMotorService: AeronaveMotorService,
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
    this.aeronavesMotoresFiltrados = this.filtroLista ? this.filtrarAeronaveMotor(this.filtroLista) : this.aeronavesMotores;
  }

  filtrarAeronaveMotor(filtrarPor: string): AeronaveMotor[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.aeronavesMotores.filter(
      aeronaveMotor => aeronaveMotor.matriculaAeronave.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.aeronaveMotorService.obterTodos().subscribe(
      (_aeronavesMotores: AeronaveMotor[]) => {
      this.aeronavesMotores = _aeronavesMotores;
      this.aeronavesMotoresFiltrados = this.aeronavesMotores;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
