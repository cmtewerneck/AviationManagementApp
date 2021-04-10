import { Component, OnInit } from '@angular/core';
import { Aeronave } from 'src/app/aeronaves/models/Aeronave';
import { Tripulante } from 'src/app/tripulantes/models/Tripulante';
import { Treinamento } from 'src/app/treinamento/models/Treinamento';
import { OrdemServico } from 'src/app/ordemServico/models/OrdemServico';
import { AeronaveTarifa } from 'src/app/aeronavesTarifas/models/AeronaveTarifa';
import { HomepageService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
  //styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  
  aeronavesCadastradas: number;
  tripulantesCadastrados: number;
  aeronaves: Aeronave[];
  tripulantes: Tripulante[];
  treinamentos: Treinamento[];
  aeronaveTarifas: AeronaveTarifa[];
  ordensServico: OrdemServico[];
  //aeronave: Aeronave;
  ordensAbertas: number;
  time = new Date();
  timer;
  
  constructor(private homepageService: HomepageService) { }
  
  ngOnInit(): void {
    this.obterQuantidadeAeronavesCadastradas();
    this.obterQuantidadeTripulantesCadastrados();
    this.obterQuantidadeOrdensAbertas();
    this.ObterAeronaves();
    this.ObterTripulantes();
    this.ObterTreinamentos();
    this.ObterAeronaveTarifas();
    this.ObterOrdensServico();
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

  ObterAeronaves() {
    this.homepageService.obterAeronaves().subscribe(
      (_aeronaves: Aeronave[]) => {
        this.aeronaves = _aeronaves;
      }, error => {
        console.log(error);
      });
    }

  ObterTripulantes() {
    this.homepageService.obterTripulantes(2).subscribe(
      (_tripulantes: Tripulante[]) => {
        this.tripulantes = _tripulantes;
      }, error => {
        console.log(error);
      });
    }

  ObterTreinamentos() {
    this.homepageService.obterTreinamentos().subscribe(
      (_treinamentos: Treinamento[]) => {
        this.treinamentos = _treinamentos;
      }, error => {
        console.log(error);
      });
    }

  ObterAeronaveTarifas() {
    this.homepageService.obterAeronaveTarifas().subscribe(
      (_aeronaveTarifas: AeronaveTarifa[]) => {
        this.aeronaveTarifas = _aeronaveTarifas;
      }, error => {
        console.log(error);
      });
    }

  ObterOrdensServico() {
    this.homepageService.obterOrdensServico().subscribe(
      (_ordensServico: OrdemServico[]) => {
        this.ordensServico = _ordensServico;
      }, error => {
        console.log(error);
      });
    }

}    