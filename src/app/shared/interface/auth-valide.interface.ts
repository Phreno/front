/**
 * Interface de récupération d’un utilisateur
 *
 * @see https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
 * @export
 * @class IUtilisateurConnecte
 */
export class IAuthValide {
  /**
   * A Firebase Auth ID token for the authenticated user.
   *
   * @type {string}
   * @memberof IUtilisateurConnecte
   */
  public idToken: string;
  /**
   * The email for the authenticated user.
   *
   * @type {string}
   * @memberof IUtilisateurConnecte
   */
  public email: string;
  /**
   * A Firebase Auth refresh token for the authenticated user.
   *
   * @type {string}
   * @memberof IUtilisateurConnecte
   */
  public refreshToken: string;

  /**
   * The number of seconds in which the ID token expires.
   *
   * @type {string}
   * @memberof IUtilisateurConnecte
   */
  public expiresIn: string;

  /**
   * The uid of the authenticated user.
   *
   * @type {string}
   * @memberof IUtilisateurConnecte
   */
  public localId: string;

  /**
   * Whether the email is for an existing account.
   *
   * @type {boolean}
   * @memberof IUtilisateurConnecte
   */
  public registered?: boolean;

  /**
   * 
   *
   * @type {string}
   * @memberof IUtilisateurConnecte
   */
  public displayName: string;

  /**
   *
   *
   * @type {string}
   * @memberof IUtilisateurConnecte
   */
  public kind: string;
}
