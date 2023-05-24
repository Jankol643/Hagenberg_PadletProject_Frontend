import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Padlet} from "../shared/padlet";
import {PadletFactory} from "../shared/padlet-factory";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFormErrorMessages} from "./padlet-form-error-messages";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-padlet-form',
  templateUrl: './padlet-form.component.html',
  styles: [
  ]
})
export class PadletFormComponent implements OnInit {

  padletForm : FormGroup;
  padlet : Padlet = PadletFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingPadlet = false;
  entries: FormArray;

  constructor(
    private fb: FormBuilder,
    private ps: PadletStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.padletForm = this.fb.group({});
    this.entries = this.fb.array([]);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isUpdatingPadlet = true;
      this.ps.getSingle(id).subscribe(
        padlet => {
          this.padlet = padlet;
          this.initPadlet();
        }

      );
    }
    this.initPadlet();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  initPadlet() {
    this.buildEntriesArray();
    this.padletForm = this.fb.group({
      id:this.padlet.id,
      title: [this.padlet.title, Validators.required],
      entries: this.entries,
      ispublic: [this.padlet.is_public, Validators.required]
    });

    this.padletForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

  buildEntriesArray() {
    if(this.padlet.entries) {
      this.entries = this.fb.array([]);
      for (let entry of this.padlet.entries) {
        let fg = this.fb.group({
          id: new FormControl(entry.id),
          entryText: new FormControl(entry.entryText, [Validators.required])
        });
        this.entries.push(fg);
      }

    }
  }

  addEntryControl() {
    this.entries.push(this.fb.group({ id: 0, entryText: null}))
  }

  updateErrorMessages() {
    if(!this.padletForm.invalid) {
      console.log("Form valid");
    } else {
      console.error("Form invalid");
    }
    this.errors = {};

    for (const message of PadletFormErrorMessages) {
      const control = this.padletForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    //do not submit empty entries
    this.padletForm.value.entries = this.padletForm.value.entries.filter(
      (entry: { entryText: string}) => entry.entryText
    );

    const padlet : Padlet = PadletFactory.fromObject(this.padletForm.value);

    if (this.isUpdatingPadlet) {
      if (this.isLoggedIn()) {
        let $visibility = this.padletForm.value.ispublic;
        $visibility == 'public' ? padlet.is_public = 1 : padlet.is_public = 0;
      }
      this.ps.update(padlet).subscribe(res => {
        this.router.navigate(["../../padlets", padlet.id], {
          relativeTo: this.route
        });
      });

    } else { //new padlet
      if (this.isLoggedIn()) {
        padlet.user_id = parseInt(<string>this.authService.getLoggedInUser());
        let $visibility = this.padletForm.value.ispublic;
        $visibility == 'public' ? padlet.is_public = 1 : padlet.is_public = 0;
      } else {
        padlet.user_id = null;
        padlet.is_public = 1; //padlet is public when user is not logged in
      }
      this.ps.create(padlet).subscribe(res => {
        this.padlet = PadletFactory.empty();
        this.padletForm.reset(PadletFactory.empty());
        this.router.navigate(["../padlets"], {
          relativeTo: this.route
        })
      })
    }
  }

}
