import { Component, OnInit } from '@angular/core';
import { AeronaveService } from '../../../_services/aeronave.service';
import { Aeronave } from 'src/app/_models/Aeronave';

@Component({
  selector: 'app-aeronaves',
  templateUrl: './aeronaves.component.html',
  styleUrls: ['./aeronaves.component.css']
})
export class AeronavesComponent implements OnInit {

  aeronaves: Aeronave[];
  aeronavesFiltradas: Aeronave[];

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.aeronavesFiltradas = this.filtroLista ? this.filtrarAeronave(this.filtroLista) : this.aeronaves;
  }

  constructor(private aeronaveService: AeronaveService) { }

  ngOnInit() {
    this.ObterTodos();
  }

  filtrarAeronave(filtrarPor: string): Aeronave[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.aeronaves.filter(
      aeronave => aeronave.matricula.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.aeronaveService.ObterTodos().subscribe(
      (_aeronaves: Aeronave[]) => {
      this.aeronaves = _aeronaves;
      console.log(_aeronaves);
    }, error => {
        console.log(error);
    });
  }

}
