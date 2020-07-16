import { Component, OnInit, Input } from '@angular/core';
import { UtilisateurConnecte } from 'src/app/shared/model/utilisateur-connecte.model';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css'],
})
export class AnimationComponent implements OnInit {
  @Input()
  entete: string;

  @Input()
  texteMisEnValeur: string;

  @Input()
  sousTitre: string;
  constructor() {}

  ngOnInit(): void {}
}
