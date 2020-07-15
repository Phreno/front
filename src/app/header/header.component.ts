import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
  //providers: [AuthService],
})
export class HeaderComponent implements OnInit, OnDestroy {
  estAuthentifie = false;

  private _souscriptionUtilisateur: Subscription;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._souscriptionUtilisateur = this._authService.connexion.subscribe(
      (user) => {
        this.estAuthentifie = !!user;
      }
    );
  }

  ngOnDestroy() {
    this._souscriptionUtilisateur.unsubscribe();
  }
}
