import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localStorage';

@Component({
  selector: 'app-control-sidebar',
  templateUrl: './control-sidebar.component.html'
})
export class ControlSidebarComponent implements OnInit {

  LocalStorage = new LocalStorageUtils();

  constructor(
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.LocalStorage.limparDadosLocaisUsuario();
    this.toastr.info('Você foi desconectado', 'LOGOUT', {
      closeButton: true,
      progressBar: true,
      timeOut: 2000
    });
    this.router.navigate(['/conta/login']);
  }
}
