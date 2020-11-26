import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegulamenteiBaseComponent } from '../regulamentei-form.base.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent extends RegulamenteiBaseComponent implements OnInit {

  inicioJornada: any;
  inicioJornadaMinutos: any;
  primeiroAcionamento: any;
  primeiroAcionamentoMinutos: any;
  ultimoCorte: any;
  ultimoCorteMinutos: any;
  diferenca: any;
  clicado: boolean = false;

  constructor(private toastr: ToastrService, private fb: FormBuilder) { super(); }

  ngOnInit(): void {
    this.regulamenteiForm = this.fb.group({
      inicioJornada: ['', [Validators.required]],
      primeiroAcionamento: ['', [Validators.required]],
      ultimoCorte: ['', [Validators.required]],
      voouSeisDias: ['']
    });
  }

  dividirInicioJornada() {
    // divide a string em duas partes, separado por dois-pontos, e transforma em número
    this.inicioJornada = this.regulamenteiForm.get('inicioJornada').value;
    let [horaInicioJornada, minutoInicioJornada] = this.inicioJornada.split(':').map(v => parseInt(v));
    if (!minutoInicioJornada) { // para o caso de não ter os minutos
      minutoInicioJornada = 0;
    }
    this.inicioJornadaMinutos = minutoInicioJornada + (horaInicioJornada * 60);

    this.ultimoCorte = this.regulamenteiForm.get('ultimoCorte').value;
    let [horaUltimoCorte, minutoUltimoCorte] = this.ultimoCorte.split(':').map(v => parseInt(v));
    if (!minutoUltimoCorte) { // para o caso de não ter os minutos
      minutoUltimoCorte = 0;
    }
    this.ultimoCorteMinutos = minutoUltimoCorte + (horaUltimoCorte * 60);
    
    this.diferenca = this.ultimoCorteMinutos - this.inicioJornadaMinutos;
    console.log(this.diferenca);
    this.clicado = !this.clicado;
  }
}
