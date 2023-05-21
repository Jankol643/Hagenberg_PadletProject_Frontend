import {Component} from '@angular/core';
import {Padlet} from "../shared/padlet";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFactory} from "../shared/padlet-factory";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})
export class PadletDetailsComponent {

  padlet: Padlet = PadletFactory.empty();

  constructor(
    private ps: PadletStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.ps.getSingle(params['id']).subscribe((p: Padlet) => this.padlet = p);
  }

  getRating(num: number) {
    return new Array(num);
  }

  removePadlet() {
    if (confirm('Padlet wirklich löschen?')) {
      this.ps.remove(this.padlet.id).subscribe((res: any) => this.router.navigate(['../'], {
        relativeTo: this.route
      }));
      window.alert("Padlet deleted!");
    }
  }
}
