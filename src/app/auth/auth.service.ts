import { AuthModel } from './auth.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAuthValide } from '../shared/interface/auth-valide.interface';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { UtilisateurConnecte } from '../shared/model/utilisateur-connecte.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _FIREBASE_API_KEY =
    'AIzaSyD4is_PLAaoOA_EAu-a6g71D6ah0iX29Gs';
  private readonly _URL_CONNEXION = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this._FIREBASE_API_KEY}`;
  private readonly _URL_ENREGISTREMENT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this._FIREBASE_API_KEY}`;
  constructor(private httpClient: HttpClient) {}

  connexion = new Subject<UtilisateurConnecte>();

  enregistreUtilisateur(connexionPayload: AuthModel) {
    connexionPayload.returnSecureToken = true;
    return this.httpClient
      .post<IAuthValide>(this._URL_ENREGISTREMENT, connexionPayload)
      .pipe(
        catchError(this.gereLesErreurs),
        tap(this.gereAuthentification.bind(this))
      );
  }

  connecteUtilisateur(connexionPayload: AuthModel) {
    connexionPayload.returnSecureToken = true;
    return this.httpClient
      .post<IAuthValide>(this._URL_CONNEXION, connexionPayload)
      .pipe(
        catchError(this.gereLesErreurs),
        tap(this.gereAuthentification.bind(this))
      );
  }

  private gereAuthentification(authentification) {
    const expirationDate = new Date(
      new Date().getTime() + +authentification.expiresIn * 1000
    );
    const utilisateur = new UtilisateurConnecte(
      authentification.email,
      authentification.localId,
      authentification.idToken,
      expirationDate
    );
    this.connexion.next(utilisateur);
  }

  private gereLesErreurs(error: HttpErrorResponse) {
    console.error(error);
    const erreur = (error &&
      error.error &&
      error.error.error &&
      error.error.error.message && {
        message: error.error.error.message,
      }) || { message: 'Erreur lors de l’appel au serveur' };
    return throwError(erreur);
  }
}
