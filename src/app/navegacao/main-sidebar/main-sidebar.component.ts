import { Component } from '@angular/core';
import { LocalStorageUtils } from 'src/app/utils/localStorage';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html'
})
export class MainSidebarComponent {

  LocalStorage = new LocalStorageUtils();
  token: string = '';
  email: string = '';
  user: any;

  constructor() { }

  usuarioLogado(): boolean {
    this.token = this.LocalStorage.obterTokenUsuario();
    this.user = this.LocalStorage.obterUsuario();

    if (this.user) { this.email = this.user.email; }

    return this.token !== null;
  }

}
