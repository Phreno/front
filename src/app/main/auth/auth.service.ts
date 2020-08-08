import { AuthModel } from './auth.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { UtilisateurConnecte } from 'src/app/shared/model/utilisateur-connecte.model';
import { IAuthValide } from 'src/app/shared/interface/auth-valide.interface';

/**
 * Service d'authentification
 *
 * @export
 * @class AuthService
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _FIREBASE_API_KEY =
    'AIzaSyBnwbXiqZqxsBAu0_3V-0Sos19A5SgxGUY';
  private readonly _URL_CONNEXION = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this._FIREBASE_API_KEY}`;
  private readonly _URL_ENREGISTREMENT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this._FIREBASE_API_KEY}`;
  constructor(private httpClient: HttpClient) { }

  connexion = new Subject<UtilisateurConnecte>();


  /**
   * Enregistre un nouvel utilisateur
   *
   * @param {AuthModel} connexionPayload
   * @return {*} 
   * @memberof AuthService
   */
  enregistreUtilisateur(connexionPayload: AuthModel) {
    connexionPayload.returnSecureToken = true;
    return this.httpClient
      .post<IAuthValide>(this._URL_ENREGISTREMENT, connexionPayload)
      .pipe(
        catchError(this.gereLesErreurs),
        tap(this.gereAuthentification.bind(this))
      );
  }

  /**
   * Connecte l'utilisateur
   *
   * @param {AuthModel} connexionPayload
   * @return {*} 
   * @memberof AuthService
   */
  connecteUtilisateur(connexionPayload: AuthModel) {
    connexionPayload.returnSecureToken = true;
    return this.httpClient
      .post<IAuthValide>(this._URL_CONNEXION, connexionPayload)
      .pipe(
        catchError(this.gereLesErreurs),
        tap(this.gereAuthentification.bind(this))
      );
  }

  /**
   * Synchronise la connexion de l'utilisateur
   *
   * @private
   * @param {*} authentification
   * @memberof AuthService
   */
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

  /**
   * Retourne le message d'erreur
   *
   * @private
   * @param {HttpErrorResponse} error
   * @return {*} 
   * @memberof AuthService
   */
  private gereLesErreurs(error: HttpErrorResponse) {
    console.error(error);
    let erreur = this.extraitLeMessageErreur(error);

    erreur = erreur || { message: 'Erreur lors de l’appel au serveur' };
    return throwError(erreur);
  }

  /**
   * Extrait le message d'erreur s'il existe
   *
   * @private
   * @param {HttpErrorResponse} error
   * @return {*} 
   * @memberof AuthService
   */
  private extraitLeMessageErreur(error: HttpErrorResponse) {
    return (this.contientUnMessageErreur(error) && {
      message: error.error.error.message,
    });
  }

  /**
   * S'assure qu'il existe un message d'erreur
   *
   * @private
   * @param {HttpErrorResponse} error
   * @return {*} 
   * @memberof AuthService
   */
  private contientUnMessageErreur(error: HttpErrorResponse) {
    return error &&
      error.error &&
      error.error.error &&
      error.error.error.message;
  }
}

