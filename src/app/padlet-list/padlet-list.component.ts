import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Padlet, Entry } from "../shared/padlet";
import {PadletStoreService} from "../shared/padlet-store.service";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: [
  ]
})
export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];

  @Output() showDetailsEvent = new EventEmitter<Padlet>();

  constructor(private ps : PadletStoreService) {
  }

  ngOnInit(): void {
    this.padlets = this.ps.getAll();

  }

  showDetails(padlet: Padlet) {
    this.showDetailsEvent.emit(padlet);
  }
}
