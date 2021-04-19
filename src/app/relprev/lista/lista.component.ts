import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RelprevBaseComponent } from '../relprev-form.base.component';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent extends RelprevBaseComponent implements OnInit {

  inicioJornada: any;
  inicioJornadaMinutos: any;
  primeiroAcionamento: any;
  primeiroAcionamentoMinutos: any;
  ultimoCorte: any;
  ultimoCorteMinutos: any;
  diferenca: any;
  clicado: boolean = false;

  constructor(private fb: FormBuilder) { super(); }

  ngOnInit(): void {
    this.relprevForm = this.fb.group({
      inicioJornada: ['', [Validators.required]],
      primeiroAcionamento: ['', [Validators.required]],
      ultimoCorte: ['', [Validators.required]],
      voouSeisDias: ['']
    });
  }

  gerarPdf() {
    console.log('Gerando PDF ...');

    //var imgData = 'assets/modelo_certificado.png';
    var imgData = 'assets/modelo_certificado_2.jpg';
    //var imgData = 'assets/modelo_certificado_3.jpg';
    const doc = new jsPDF('l', 'mm', 'a4');

    doc.addImage(imgData, 'PNG', 0, 0, 297, 210);
    doc.line(40, 40, 257, 40);

    doc.setTextColor(0,106,178);
    doc.setFontSize(40);
    doc.setFont("century-gothic", "bold");
    doc.text('CERTIFICADO DE CONCLUSÃO', 40, 55);

    doc.line(40, 61, 257, 61);
    
    doc.setTextColor(0,0,0);
    doc.setFontSize(20);
    doc.setFont("century-gothic", "regular");
    doc.text('Certifico para os devidos fins, que Thiago Werneck Caldas, CPF 123.456.789-10, concluiu com êxito o curso de Piloto Privado de Avião nesta entidade, no período de 10/01/2021 à 12/01/2021, com carga horária de 360 horas.', 40, 80, {maxWidth: 217, align: "justify"});

    doc.setFontSize(14);
    doc.text('Rio, 12 de Janeiro de 2021', 40, 140);
    
    doc.line(40, 170, 100, 170); // ASSINATURA DIRETOR
    doc.line(197, 170, 257, 170); // ASSINATURA ALUNO

    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.setFont("century-gothic", "regular");
    doc.text('DIRETOR', 60, 176);

    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.setFont("century-gothic", "regular");
    doc.text('ALUNO', 220, 176);



    // FOOTER
    const pageCount = doc.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      // Go to page i
      doc.setPage(i);
      // Print Page 1 of 4 for example
      doc.text('Página ' + String(i) + ' de ' + String(pageCount), 210 - 20, 297 - 20, null, "right");
    }
    
    doc.save('Ofício - ' + '.pdf');
  }
}
