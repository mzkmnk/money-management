import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-back-on-header',
  templateUrl: './back-on-header.component.html',
  styleUrls: ['./back-on-header.component.scss'],
})
export class BackOnHeaderComponent  implements OnInit {
  @Input() title:string= '';
  constructor() { }

  ngOnInit() {}

}
