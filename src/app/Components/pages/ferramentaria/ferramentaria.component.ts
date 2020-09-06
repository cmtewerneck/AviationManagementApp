import { Component, OnInit, TemplateRef } from '@angular/core';
import { FerramentariaService } from '../../../_services/ferramentaria.service';
import { Ferramentaria } from 'src/app/_models/Ferramentaria';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ferramentaria',
  templateUrl: './ferramentaria.component.html',
  styleUrls: ['./ferramentaria.component.css']
})
export class FerramentariaComponent implements OnInit {

  ferramentarias: Ferramentaria[];
  ferramentaria: Ferramentaria;
  ferramentariasFiltradas: Ferramentaria[];
  registerForm: FormGroup;
  modoSalvar = 'post';
  bodyDeletarFerramentaria = '';

  constructor(
    private ferramentariaService: FerramentariaService,
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
    this.ferramentariasFiltradas = this.filtroLista ? this.filtrarFerramentaria(this.filtroLista) : this.ferramentarias;
  }

  editarFerramentaria(ferramentaria: Ferramentaria, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.ferramentaria = ferramentaria;
    this.registerForm.patchValue(ferramentaria);
  }

  novaFerramentaria(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  excluirFerramentaria(ferramentaria: Ferramentaria, template: any) {
    this.openModal(template);
    this.ferramentaria = ferramentaria;
    this.bodyDeletarFerramentaria = `Tem certeza que deseja excluir o item: ${ferramentaria.nomenclatura}`;
  }

  confirmeDelete(template: any) {
    this.ferramentariaService.ExcluirFerramentaria(this.ferramentaria.id).subscribe(
      () => {
        template.hide();
        this.ObterTodas();
        this.toastr.success('Excluida com sucesso');
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
    this.ObterTodas();
  }

  filtrarFerramentaria(filtrarPor: string): Ferramentaria[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.ferramentarias.filter(
      ferramentaria => ferramentaria.nomenclatura.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  validation() {
    this.registerForm = this.fb.group({
      item: ['', Validators.nullValidator],
      partNumber: ['', Validators.nullValidator],
      nomenclatura: ['', Validators.required],
      quantidade: ['', Validators.required],
      localizacao: ['', Validators.nullValidator],
      partNumberAlternativo: ['', Validators.nullValidator],
      aplicacao: ['', Validators.nullValidator],
      capitulo: ['', Validators.nullValidator],
      serialNumber: ['', Validators.nullValidator],
      doc: ['', Validators.nullValidator],
      imagem: ['', Validators.nullValidator],
      status: ['', Validators.nullValidator]
    });
  }

  ObterTodas() {
    this.ferramentariaService.ObterTodas().subscribe(
      (_ferramentarias: Ferramentaria[]) => {
      this.ferramentarias = _ferramentarias;
      this.ferramentariasFiltradas = this.ferramentarias;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error}`);
        console.log(error);
    });
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post')
        {
          this.ferramentaria = Object.assign({}, this.registerForm.value);
          this.ferramentariaService.AdicionarFerramentaria(this.ferramentaria).subscribe(
            (novaFerramentaria: Ferramentaria) => {
              template.hide();
              this.ObterTodas();
              this.toastr.success('Adicionada com sucesso');
            }, error => {
              this.toastr.error(`Erro ao adicionar: ${error}`);
              console.log(error);
            }
          );
        } else
            {
              this.ferramentaria = Object.assign({id: this.ferramentaria.id}, this.registerForm.value);
              this.ferramentariaService.EditarFerramentaria(this.ferramentaria).subscribe(
                () => {
                  template.hide();
                  this.ObterTodas();
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
