import { Component, OnInit } from '@angular/core';
import { HomepageService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  
  aeronavesCadastradas: number;
  tripulantesCadastrados: number;
  ordensAbertas: number;
  time = new Date();
  timer;
  
  constructor(private homepageService: HomepageService) { }
  
  ngOnInit(): void {
    this.obterQuantidadeAeronavesCadastradas();
    this.obterQuantidadeTripulantesCadastrados();
    this.obterQuantidadeOrdensAbertas();
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnDestroy(){
    clearInterval(this.timer);
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
    this.homepageService.obterQuantidadeTripulantesCadastrados(2).subscribe(
      (_tripulantes: number) => {
        this.tripulantesCadastrados = _tripulantes;
      },
      error => {
        console.log(error);
      });
  }
      
  obterQuantidadeOrdensAbertas() {
    this.homepageService.obterQuantidadeOrdensAbertas().subscribe(
      (_ordens: number) => {
        this.ordensAbertas = _ordens;
      },
      error => {
        console.log(error);
      });
  }

}    