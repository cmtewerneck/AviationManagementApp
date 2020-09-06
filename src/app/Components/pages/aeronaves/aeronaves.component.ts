import { Component, OnInit, TemplateRef } from '@angular/core';
import { AeronaveService } from '../../../_services/aeronave.service';
import { Aeronave } from 'src/app/_models/Aeronave';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aeronaves',
  templateUrl: './aeronaves.component.html',
  styleUrls: ['./aeronaves.component.css']
})
export class AeronavesComponent implements OnInit {

  aeronaves: Aeronave[];
  aeronave: Aeronave;
  aeronavesFiltradas: Aeronave[];
  registerForm: FormGroup;
  modoSalvar = 'post';
  bodyDeletarAeronave = '';

  constructor(
    private aeronaveService: AeronaveService,
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
    this.aeronavesFiltradas = this.filtroLista ? this.filtrarAeronave(this.filtroLista) : this.aeronaves;
  }

  editarAeronave(aeronave: Aeronave, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.aeronave = aeronave;
    this.registerForm.patchValue(aeronave);
  }

  novaAeronave(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  excluirAeronave(aeronave: Aeronave, template: any) {
    this.openModal(template);
    this.aeronave = aeronave;
    this.bodyDeletarAeronave = `Tem certeza que deseja excluir a aeronave: ${aeronave.matricula}`;
  }

  confirmeDelete(template: any) {
    this.aeronaveService.ExcluirAeronave(this.aeronave.id).subscribe(
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

  filtrarAeronave(filtrarPor: string): Aeronave[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.aeronaves.filter(
      aeronave => aeronave.matricula.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  validation() {
    this.registerForm = this.fb.group({
      matricula: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      fabricante: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      categoria: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      modelo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      ano: ['', Validators.nullValidator],
      pesoVazio: ['', Validators.nullValidator],
      horasTotais: ['', Validators.nullValidator],
      horasRestantes: ['', Validators.nullValidator],
      vencimentoCA: ['', Validators.nullValidator],
      vencimentoCM: ['', Validators.nullValidator],
      ultimaPesagem: ['', Validators.nullValidator],
      vencimentoReta: ['', Validators.nullValidator]
    });
  }

  ObterTodas() {
    this.aeronaveService.ObterTodas().subscribe(
      (_aeronaves: Aeronave[]) => {
      this.aeronaves = _aeronaves;
      this.aeronavesFiltradas = this.aeronaves;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error}`);
        console.log(error);
    });
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post')
        {
          this.aeronave = Object.assign({}, this.registerForm.value);
          this.aeronaveService.AdicionarAeronave(this.aeronave).subscribe(
            (novaAeronave: Aeronave) => {
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
              this.aeronave = Object.assign({id: this.aeronave.id}, this.registerForm.value);
              this.aeronaveService.EditarAeronave(this.aeronave).subscribe(
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
