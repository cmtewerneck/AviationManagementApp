import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

}
