import { Component, OnInit } from '@angular/core';
import { TripulanteService } from '../../../_services/tripulante.service';
import { Tripulante } from 'src/app/_models/Tripulante';

@Component({
  selector: 'app-tripulacao',
  templateUrl: './tripulacao.component.html',
  styleUrls: ['./tripulacao.component.css']
})
export class TripulacaoComponent implements OnInit {

  tripulantes: Tripulante[];
  tripulantesFiltrados: Tripulante[];

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.tripulantesFiltrados = this.filtroLista ? this.filtrarTripulante(this.filtroLista) : this.tripulantes;
  }

  constructor(private tripulanteService: TripulanteService) { }

  ngOnInit() {
    this.ObterTodos();
  }

  filtrarTripulante(filtrarPor: string): Tripulante[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.tripulantes.filter(
      tripulante => tripulante.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.tripulanteService.ObterTodos().subscribe(
      (_tripulantes: Tripulante[]) => {
      this.tripulantes = _tripulantes;
      console.log(_tripulantes);
    }, error => {
        console.log(error);
    });
  }

}
