import { Injectable } from '@angular/core';
import {Entry, Padlet} from "./padlet";

@Injectable({
  providedIn: 'root'
})
export class PadletStoreService {

  padlets : Padlet[];

  constructor() {
    this.padlets = [
      new Padlet('Padlet 1', 1, 0, [new Entry(1, 'Entry 1', 5),
        new Entry(2, 'Entry 2', 5)]),
      new Padlet('Padlet 2', 1, 0, [new Entry(3, 'Entry 3', 5),
        new Entry(4, 'Entry 4', 5)]),
    ];
  }

  public getAll() {
    return this.padlets;
  }
}
