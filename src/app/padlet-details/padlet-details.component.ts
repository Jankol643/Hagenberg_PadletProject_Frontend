import {Component} from '@angular/core';
import {Padlet} from "../shared/padlet";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFactory} from "../shared/padlet-factory";
import {AuthenticationService} from "../shared/authentication.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: []
})
export class PadletDetailsComponent {

  padlet: Padlet = PadletFactory.empty();
  editAllowed = false;

  constructor(
    private ps: PadletStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public authService: AuthenticationService,
  ) {

  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.ps.getSingle(params['id']).subscribe((p: Padlet) => {
      this.padlet = p;
      this.canEdit();
    });
  }

  canEdit() {
    if (this.padlet.user_id != null) {
      if (this.authService.isLoggedIn()) { //user is logged in
        //check if logged-in user is owner
        if (this.padlet.user_id == parseInt(<string>this.authService.getLoggedInUser())) {
          this.editAllowed = true;
        }
      }
    } else {
      //padlet belongs to anonymous user
      this.editAllowed = true;
    }
  }

  removePadlet() {
    if (this.editAllowed && confirm('Padlet wirklich löschen?')) {
      this.ps.remove(this.padlet.id).subscribe((res: any) => this.router.navigate(['../'], {
        relativeTo: this.route
      }));
      this.toastr.info("Padlet deleted");
    }
  }

}
