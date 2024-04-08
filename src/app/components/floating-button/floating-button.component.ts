import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
})
export class FloatingButtonComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}

  clickToRecordExpense(){
    this.router.navigate(['/record-expense']);
  }
}
