import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthResource } from './auth.resource';
import { SharedResource } from '../shared/shared.resource';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
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
    courriel: new FormControl('', [Validators.required, Validators.email]),
    p455w0rd: new FormControl('', [
      Validators.required,
      Validators.pattern(AuthResource.P455W0RD_REGEX),
    ]),
  };

  constructor() {}

  ngOnInit(): void {}

  permuteAffichageP455w0rd() {
    this.masqueP455w0rd = !this.masqueP455w0rd;
  }

  permuteMode() {
    this.estEnModeConnexion = !this.estEnModeConnexion;
  }

  afficheLeModeConnexion() {
    this.estEnModeConnexion = AuthResource.MODE_CONNEXION;
  }

  afficheLeModeEnregistrement() {
    this.estEnModeConnexion = AuthResource.MODE_ENREGISTREMENT;
  }
}
