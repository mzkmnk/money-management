import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() userIconURL: string =
    'https://ionicframework.com/docs/img/demos/avatar.svg';
  @Input() username: string = 'User';
  @Input() type:String='home';
  @Input() addFunc: Function = () => {};
  constructor(private router: Router) {}

  ngOnInit() {}

  onClick() {
    this.addFunc();
  }
}
