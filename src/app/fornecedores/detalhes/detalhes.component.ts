import { Component, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Fornecedor } from '../models/Fornecedor';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  errors: any[] = [];
  imagens: string = environment.imagensUrl;
  fornecedor: Fornecedor = new Fornecedor();
  enderecoMap;

  constructor(
    private fornecedorService: FornecedorService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer) {

      this.fornecedor = this.route.snapshot.data['fornecedor'];
      this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/place?q='
                       + this.EnderecoCompleto() + '&key=AIzaSyABHLihHWmAOheF99OVL7ClFqLZmkOiHuc');
    }

    public EnderecoCompleto(): string {
      return this.fornecedor.endereco.logradouro + ', ' + this.fornecedor.endereco.numero + ' - ' + this.fornecedor.endereco.bairro
             + ', ' + this.fornecedor.endereco.cidade + ' - ' + this.fornecedor.endereco.estado;
    }

    excluirFornecedor(template: any) {
      this.fornecedorService.ExcluirFornecedor(this.fornecedor.id)
      .subscribe(
        fornecedor => { this. sucessoExclusao(fornecedor) },
        error => { this.falha(error) }
      )
      template.hide();
    }
  
    sucessoExclusao(evento: any) {
      const toast = this.toastr.success('Fornecedor excluido!', 'Sucesso!');
      if (toast) {
        toast.onHidden.subscribe(() => {
          this.router.navigate(['/fornecedores/listar-todos']);
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
