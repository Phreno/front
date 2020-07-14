import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { DOCUMENT } from '@angular/common';

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
export class AppComponent implements OnInit {
  title = 'front';

  ngOnInit() {}
}
