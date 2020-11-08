import { Component, OnInit } from '@angular/core';
import { HomepageService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {

  aeronavesCadastradas: number;
  tripulantesCadastrados: number;

  constructor(private homepageService: HomepageService) { }

  ngOnInit(): void {
    this.obterQuantidadeAeronavesCadastradas();
    this.obterQuantidadeTripulantesCadastrados();
  }

  obterQuantidadeAeronavesCadastradas() {
    this.homepageService.obterQuantidadeAeronavesCadastradas().subscribe(
      (_aeronaves: number) => {
        this.aeronavesCadastradas = _aeronaves;
      },
      error => {
        console.log(error);
      });
  }

  obterQuantidadeTripulantesCadastrados() {
    this.homepageService.obterQuantidadeTripulantesCadastrados().subscribe(
      (_tripulantes: number) => {
        this.tripulantesCadastrados = _tripulantes;
      },
      error => {
        console.log(error);
      });
  }
}
