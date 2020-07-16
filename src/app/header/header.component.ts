import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilisateurConnecte } from '../shared/model/utilisateur-connecte.model';
import { AuthService } from '../main/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
  //providers: [AuthService],
})
export class HeaderComponent implements OnInit, OnDestroy {
  utilisateurAuthentifie: UtilisateurConnecte;

  get estAuthentifie() {
    return !!this.utilisateurAuthentifie;
  }

  private _souscriptionUtilisateur: Subscription;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._souscriptionUtilisateur = this._authService.connexion.subscribe(
      (utilisateur) => {
        this.utilisateurAuthentifie = utilisateur;
      }
    );
  }

  ngOnDestroy() {
    this._souscriptionUtilisateur.unsubscribe();
  }
}
