import {Component, OnInit} from '@angular/core';
import { Padlet } from "../shared/padlet";
import {PadletStoreService} from "../shared/padlet-store.service";
import {AuthenticationService} from "../shared/authentication.service";
import {Router} from "@angular/router";
import jwt_decode from "jwt-decode";

interface Token {
  exp: number;
  user: {
    id: string;
  }
}

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: [
  ]
})
export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];

  constructor(private ps : PadletStoreService,
              private router: Router,
              private authService: AuthenticationService
              ) {
  }

  ngOnInit(): void {
    this.ps.getAll().subscribe(res => this.padlets = res);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public getLoggedInUser(): string|undefined {
    if (sessionStorage.getItem("token")) {
      let token: string = <string>sessionStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      return decodedToken.user.id;
    } else {
      return undefined;
    }
  }

}
