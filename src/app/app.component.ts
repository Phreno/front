import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './main/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AuthService],
})
export class AppComponent implements OnInit {
  title = 'front';

  ngOnInit() {}
}
