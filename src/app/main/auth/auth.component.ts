import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthModel } from './auth.model';
import { AuthResource } from './auth.resource';
import { AuthService } from './auth.service';
import { SharedResource } from 'src/app/shared/shared.resource';
import { IAuthValide } from 'src/app/shared/interface/auth-valide.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  estEnModeConnexion = AuthResource.MODE_CONNEXION;
  masqueP455w0rd = AuthResource.P455W0RD_MASQUE;

  libelle = {
    authentification: AuthResource.libelle.authentification,
    connexion: AuthResource.libelle.connexion,
    enregistrement: AuthResource.libelle.enregistrement,
    valider: SharedResource.libelle.bouton.valider,
    courriel: AuthResource.libelle.courriel,
    courrielPlaceholder: AuthResource.libelle.courrielPlaceholder,
    p455w0rd: AuthResource.libelle.p455w0rd,
    p455w0rdPlaceholder: AuthResource.libelle.p455w0rdPlaceholder,
    p455w0rdTooltip: AuthResource.libelle.p455w0rdTooltip,
  };

  erreur = {
    courrielObligatoire: AuthResource.erreur.courrielObligatoire,
    courrielInvalide: AuthResource.erreur.courrielInvalide,
    p455w0rdObligatoire: AuthResource.erreur.p455sw0rdObligatoire,
    p455w0rdInvalide: AuthResource.erreur.p455sw0rdInvalide,
  };

  validateurDeFormulaire = {
    courriel: new FormControl('', [Validators.required]),
    p455w0rd: new FormControl('', [Validators.required]),
  };

  statut = {
    chargementEnCours: false,
  };

  utilisateur: Partial<AuthModel> = {
    email: 'losgoomy@gmail.com',
    password: 'bépoBÉPO1234',
  };

  constructor(
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {}

  get utilisateurValide() {
    return this.doitAfficherLeBoutonValider && (this.utilisateur as AuthModel);
  }

  get doitAfficherLeBoutonValider() {
    const validateurs = Object.keys(this.validateurDeFormulaire);
    let estValide =
      validateurs &&
      validateurs.every((e) => !this.validateurDeFormulaire[e]!.errors);

    return estValide;
  }

  ngOnInit(): void {}

  permuteAffichageP455w0rd() {
    this.masqueP455w0rd = !this.masqueP455w0rd;
  }

  permuteMode() {
    this.estEnModeConnexion = !this.estEnModeConnexion;

    if (this.estEnModeConnexion) {
      this.validateurDeFormulaire = {
        courriel: new FormControl('', [Validators.required]),
        p455w0rd: new FormControl('', [Validators.required]),
      };
    } else {
      this.validateurDeFormulaire = {
        courriel: new FormControl('', [Validators.required, Validators.email]),
        p455w0rd: new FormControl('', [
          Validators.required,
          Validators.pattern(AuthResource.P455W0RD_REGEX),
        ]),
      };
    }
    this.validateurDeFormulaire.courriel.markAsUntouched();
    this.validateurDeFormulaire.p455w0rd.markAsUntouched();
  }

  valider() {
    if (this.utilisateurValide) {
      this.statut.chargementEnCours = true;
      this.afficheSnackBar('Connexion en cours ...');
      const authObservable: Observable<IAuthValide> = this.estEnModeConnexion
        ? this._authService.connecteUtilisateur(this.utilisateurValide)
        : this._authService.enregistreUtilisateur(this.utilisateurValide);
      authObservable.subscribe(
        (utilisateur) => {
          console.log(utilisateur);
          this.statut.chargementEnCours = false;
          this.afficheSnackBar('Connecté');
          this._router.navigate(['profile']);
        },
        (error) => {
          console.error(error);
          this.statut.chargementEnCours = false;
          this.afficheSnackBar(error.message);
        }
      );
    } else {
      this.validateurDeFormulaire.courriel.markAllAsTouched();
      this.validateurDeFormulaire.p455w0rd.markAllAsTouched();
    }
  }

  afficheSnackBar(message: string) {
    this._snackBar.open(message, 'Fermer', {
      duration: 2000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}
