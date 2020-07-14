export class AuthResource {
  static readonly SAISIE_OBLIGATOIRE = 'Vous devez saisir';
  static readonly MODE_CONNEXION = true;
  static readonly MODE_ENREGISTREMENT: false;

  static readonly P455W0RD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  static readonly P455W0RD_MASQUE = true;

  static readonly libelle = {
    authentification: 'Authentification',
    connexion: 'Connexion',
    enregistrement: 'Nouvel utilisateur',
    courriel: 'Courriel',
    courrielPlaceholder: 'Ex. john.doe@courriel.fr',
    p455w0rd: 'Mot de passe',
    p455w0rdPlaceholder: 'Ex. M0t_De.pa55&',
    p455w0rdTooltip: [
      'longueur 6',
      '1 chiffre',
      '1 lettre majuscule',
      '1 lettre minuscule',
    ].join(', '),
  };

  static readonly erreur = {
    courrielObligatoire: `${AuthResource.SAISIE_OBLIGATOIRE} votre courriel`,
    courrielInvalide: `${AuthResource.SAISIE_OBLIGATOIRE} un courriel valide`,
    p455sw0rdObligatoire: `${AuthResource.SAISIE_OBLIGATOIRE} votre mot de passe`,
    p455sw0rdInvalide: `${AuthResource.SAISIE_OBLIGATOIRE} un mot de passe valide`,
  };
}
