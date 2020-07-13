import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../assets/css/bootstrap.min.css',
    '../assets/css/mdb.min.css',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'front';
}
