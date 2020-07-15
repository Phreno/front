import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../assets/css/bootstrap.min.css',
    '../assets/css/mdb.min.css',
  ],
  encapsulation: ViewEncapsulation.None,
  providers:[AuthService]
})
export class AppComponent implements OnInit {
  title = 'front';

  ngOnInit() {
  }
}
