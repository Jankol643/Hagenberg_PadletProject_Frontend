import { Component } from '@angular/core';
import {Padlet} from "./shared/padlet";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  listOn = true;
  detailsOn = false;

  padlet : Padlet | undefined;

  constructor(private authService: AuthenticationService) {
  }

  isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  getLoginLabel() : string {
    return this.isLoggedIn() ? "Logout" : "Login";
  }

}
