import { Component, OnInit, TemplateRef } from '@angular/core';
import { TripulanteService } from '../../_services/tripulante.service';
import { Tripulante } from 'src/app/_models/Tripulante';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MASKS, NgBrazilValidators } from 'ng-brazil';

@Component({
  selector: 'app-tripulacao',
  templateUrl: './tripulacao.component.html'
})
export class TripulacaoComponent implements OnInit {

  tripulantes: Tripulante[];
  tripulante: Tripulante;
  tripulantesFiltrados: Tripulante[];
  registerForm: FormGroup;
  modoSalvar = 'post';
  bodyDeletarTripulante = '';
  MASKS = MASKS;

  constructor(
    private tripulanteService: TripulanteService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private toastr: ToastrService
    ) { }

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.tripulantesFiltrados = this.filtroLista ? this.filtrarTripulante(this.filtroLista) : this.tripulantes;
  }

  editarTripulante(tripulante: Tripulante, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.tripulante = tripulante;
    this.registerForm.patchValue(tripulante);
  }

  novoTripulante(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  excluirTripulante(tripulante: Tripulante, template: any) {
    this.openModal(template);
    this.tripulante = tripulante;
    this.bodyDeletarTripulante = `Tem certeza que deseja excluir o tripulante: ${tripulante.nome}`;
  }

  confirmeDelete(template: any) {
    this.tripulanteService.ExcluirTripulante(this.tripulante.id).subscribe(
      () => {
        template.hide();
        this.ObterTodos();
        this.toastr.success('Excluido com sucesso');
      }, error => {
        this.toastr.error('Erro ao tentar excluir');
        console.log(error);
      }
    );
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  ngOnInit() {
    this.validation();
    this.ObterTodos();
  }

  filtrarTripulante(filtrarPor: string): Tripulante[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.tripulantes.filter(
      tripulante => tripulante.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  validation() {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      // cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', Validators.email],
      cargo: ['', [Validators.required]],
      dataNascimento: ['', Validators.nullValidator],
      dataAdmissao: ['', Validators.nullValidator],
      sexo: ['', Validators.nullValidator],
      estadoCivil: ['', Validators.nullValidator],
      salario: ['', Validators.nullValidator],
      situacao: ['', Validators.nullValidator],
      rg: ['', Validators.nullValidator],
      orgaoEmissor: ['', Validators.nullValidator],
      tituloEleitor: ['', Validators.nullValidator],
      numeroPis: ['', Validators.nullValidator],
      numeroCtps: ['', Validators.nullValidator],
      numeroCnh: ['', Validators.nullValidator]
    });
  }

  ObterTodos() {
    this.tripulanteService.ObterTodos().subscribe(
      (_tripulantes: Tripulante[]) => {
      this.tripulantes = _tripulantes;
      this.tripulantesFiltrados = this.tripulantes;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error}`);
        console.log(error);
    });
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post')
        {
          this.tripulante = Object.assign({}, this.registerForm.value);
          this.tripulanteService.AdicionarTripulante(this.tripulante).subscribe(
            (novoTripulante: Tripulante) => {
              template.hide();
              this.ObterTodos();
              this.toastr.success('Adicionado com sucesso');
            }, error => {
              this.toastr.error(`Erro ao adicionar: ${error}`);
              console.log(error);
            }
          );
        } else
            {
              this.tripulante = Object.assign({id: this.tripulante.id}, this.registerForm.value);
              this.tripulanteService.EditarTripulante(this.tripulante).subscribe(
                () => {
                  template.hide();
                  this.ObterTodos();
                  this.toastr.success('Alterações salvas com sucesso');
                }, error => {
                  this.toastr.error(`Erro ao editar: ${error}`);
                  console.log(error);
                }
              );
            }
      }
    }
}
