import { Component } from '@angular/core';
import { Curso } from '../models/Curso';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CursoService } from '../services/curso.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  imagens: string = environment.imagensUrl;
  errors: any[] = [];

  curso: Curso;

  constructor(
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    this.curso = this.route.snapshot.data['curso'];
  }

  excluirCurso(template: any) {
    this.cursoService.excluirCurso(this.curso.id)
    .subscribe(
      curso => { this. sucessoExclusao(curso) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Curso excluido!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/cursos/listar-todos']);
      });
    }
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
  }

  openModal(template: any) {
    template.show();
  }

  zerarErros() {
    this.errors = [];
  }

}
