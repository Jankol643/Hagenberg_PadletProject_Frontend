import { Component } from '@angular/core';
import {Padlet} from "./shared/padlet";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  listOn = true;
  detailsOn = false;

  padlet : Padlet | undefined;

}
