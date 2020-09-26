import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: [
  ]
})
export class LoadingComponent implements OnInit {
  @Input() carga: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
