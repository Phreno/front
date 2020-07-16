/**
 *
 * @see https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
 * @export
 * @class ConnexionPayload
 */
export class AuthModel {
  /**
   *Creates an instance of ConnexionPayload.
   * @param {string} email The email the user is signing in with.
   * @param {string} password The password for the account.
   * @param {boolean} returnSecureToken Whether or not to return an ID and refresh token. Should always be true.
   * @memberof ConnexionPayload
   */
  constructor(
    public email: string,
    public password: string,
    public returnSecureToken: boolean = true
  ) {}
}
