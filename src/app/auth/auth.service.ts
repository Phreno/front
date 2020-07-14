import { AuthPayload } from './auth-payload.model';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly FIREBASE_API_KEY = 'AIzaSyD4is_PLAaoOA_EAu-a6g71D6ah0iX29Gs';
  private readonly URL_CONNEXION = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.FIREBASE_API_KEY}`;
  private readonly URL_ENREGISTREMENT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.FIREBASE_API_KEY}`;
  constructor(private httpClient: HttpClient) {}
  enregistreUtilisateur(connexionPayload: AuthPayload) {
    return this.httpClient.post(this.URL_ENREGISTREMENT, connexionPayload);
  }
  connecteUtilisateur(connexionPayload: AuthPayload) {
    return this.httpClient.post(this.URL_CONNEXION, connexionPayload);
  }
}
