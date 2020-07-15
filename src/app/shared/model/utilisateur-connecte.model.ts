export class UtilisateurConnecte {
  constructor(
    public email: string,
    public ID: string,
    private _token: string,
    private _expirationDuToken: Date
  ) {}

  get token() {
    return (
      (!this._expirationDuToken || new Date() > this._expirationDuToken) &&
      this._token
    );
  }

  get expirationDuToken() {
    return this._expirationDuToken;
  }
}
