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


/**
 * Permet la connexion / authentification du l'utilisateur
 *
 * @export
 * @class AuthComponent
 * @implements {OnInit}
 */
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
  ) { }

  /**
   * Retourne l'utilisateur du formulaire
   *
   * @readonly
   * @memberof AuthComponent
   */
  get utilisateurValide() {
    return this.doitAfficherLeBoutonValider && (this.utilisateur as AuthModel);
  }


  /**
   * En fonction de l'état des validateurs du formulaire,
   * statue sur l'affichage du bouton valider
   *
   * @readonly
   * @memberof AuthComponent
   */
  get doitAfficherLeBoutonValider() {
    const validateurs = Object.keys(this.validateurDeFormulaire);
    let estValide =
      validateurs &&
      validateurs.every((e) => !this.validateurDeFormulaire[e]!.errors);

    return estValide;
  }

  ngOnInit(): void { }

  /**
   * Permet d'afficher / masquer le mot de passe
   *
   * @memberof AuthComponent
   */
  permuteAffichageP455w0rd() {
    this.masqueP455w0rd = !this.masqueP455w0rd;
  }

  /**
   * Passe du mode connexion au mode authentification
   *
   * @memberof AuthComponent
   */
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
  /**
   * Si le formulaire est valide, appelle le service,
   * sinon met à jour le statut du formulaire
   *
   * @memberof AuthComponent
   */
  valider() {
    if (this.utilisateurValide) {
      this.appelleLeService();
    } else {
      this.afficheLesMessagesDuFormulaire();
    }
  }

  /**
   * Affiche les éventuelles erreurs du formulaire
   *
   * @private
   * @memberof AuthComponent
   */
  private afficheLesMessagesDuFormulaire() {
    this.validateurDeFormulaire.courriel.markAllAsTouched();
    this.validateurDeFormulaire.p455w0rd.markAllAsTouched();
  }

  /**
   * Appel le service pour authentifier / enregistrer l'utilisateur
   *
   * @private
   * @memberof AuthComponent
   */
  private appelleLeService() {
    this.statut.chargementEnCours = true;
    this.afficheSnackBar('Connexion en cours ...');
    const authObservable: Observable<IAuthValide> = this.choisiLaMethode();
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
  }

  /**
   * Suivant le formulaire, choisi entre l'authentification et l'enregistrement
   *
   * @private
   * @return {*}  {Observable<IAuthValide>}
   * @memberof AuthComponent
   */
  private choisiLaMethode(): Observable<IAuthValide> {
    return this.estEnModeConnexion
      ? this._authService.connecteUtilisateur(this.utilisateurValide)
      : this._authService.enregistreUtilisateur(this.utilisateurValide);
  }

  /**
   * Affiche un message à l'utilisateur
   *
   * @param {string} message
   * @memberof AuthComponent
   */
  afficheSnackBar(message: string) {
    this._snackBar.open(message, 'Fermer', {
      duration: 2000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}
