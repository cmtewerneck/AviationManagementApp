import { Component, Input } from '@angular/core';
import { AlunoTurma, Turma } from '../../alunosTurmas/models/AlunoTurma';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TurmaService } from '../services/turma.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'lista-aluno',
  templateUrl: './lista.alunos.component.html'
})
export class ListaAlunosComponent {
  
  imagens: string = environment.imagensUrl;
  alunoTurma: AlunoTurma;
  //turma: Turma;
  alunoTurmaId: string; // PEGANDO O ID DO ALUNOTURMA QUANDO A MODAL É ABERTA PARA PASSAR PRO SERVICE
  errors: any[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private turmaService: TurmaService) {
      
      this.alunoTurma = this.route.snapshot.data['alunoTurma'];
    }
    
    @Input()
    //alunosTurmas: Aluno[];
    alunosTurmas: AlunoTurma[];
    
    openModal(template: any, id: string) {
      template.show();
      this.alunoTurmaId = id;
      console.log(this.alunoTurmaId);
    }
    
    aprovarAluno(template: any) {
      this.turmaService.aprovarAluno(this.alunoTurmaId)
      .subscribe(
        aluno => { 
          const index = this.alunosTurmas.findIndex(x => x.id == this.alunoTurmaId);
          this.alunosTurmas = this.alunosTurmas.splice(index, 1, aluno);
          this.processarSucesso(aluno) 
        },
        falha => { this.processarFalha(falha) }
        )
        template.hide();
     }

     reprovarAluno(template: any) {
      this.turmaService.reprovarAluno(this.alunoTurmaId)
      .subscribe(
        aluno => { 
          const index = this.alunosTurmas.findIndex(x => x.id == this.alunoTurmaId);
          this.alunosTurmas = this.alunosTurmas.splice(index, 1, aluno);
          this.processarSucesso(aluno) 
        },
        falha => { this.processarFalha(falha) }
        )
        template.hide();
     }
      
      processarSucesso(response: any) {
        this.errors = [];
        this.toastr.success('Status alterado com sucesso!', 'Sucesso!');

        this.alunoTurmaId = "";
      }
      
      processarFalha(fail: any) {
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Opa :(');
        this.alunoTurmaId = "";
      }

      gerarPdf(alunoTurma: AlunoTurma) {
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
        doc.text('Certifico para os devidos fins, que ' + alunoTurma.nomeAluno + ', CPF 123.456.789-10, concluiu com êxito o curso de Piloto Privado de Avião nesta entidade, no período de 10/01/2021 à 12/01/2021, com carga horária de 360 horas.', 40, 80, {maxWidth: 217, align: "justify"});

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
        
        doc.save('Ofício - ' + alunoTurma.nomeAluno + alunoTurma.codigoTurma + '.pdf');
      }


}