import {Component, OnInit} from '@angular/core';
import { Padlet } from "../shared/padlet";
import {PadletStoreService} from "../shared/padlet-store.service";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: [
  ]
})
export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];

  constructor(private ps : PadletStoreService) {
  }

  ngOnInit(): void {
    this.ps.getAll().subscribe(res => this.padlets = res);
  }
}
