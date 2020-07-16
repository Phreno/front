import { Component, OnInit } from '@angular/core';
import { VivusService } from 'src/app/shared/vivus/vivus.service';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css'],
})
export class AnimationComponent implements OnInit {
  readonly animationID = 'animation';

  constructor(private _vivusService: VivusService) {}
  ngOnInit(): void {
    this.lanceVivus();
  }

  lanceVivus() {
    this._vivusService.lanceVivus(
      this.animationID,
      {
        duration: 300,
        file: '../../../assets/img/svg/animation.svg',
      }
    );
  }
}
