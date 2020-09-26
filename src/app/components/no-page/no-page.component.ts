import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-page',
  templateUrl: './no-page.component.html',
  styles: [
  ]
})
export class NoPageComponent {

  constructor() { }

  goBack(): any{
    history.back();
  }
}
