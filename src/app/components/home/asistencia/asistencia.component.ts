import { AsistenciaModel } from './../../../models/asistencia.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styles: [
  ]
})
export class AsistenciaComponent implements OnInit {
  @Input() modalAsistencia: boolean;
  @Input() asistencias: AsistenciaModel;
  constructor() {
    this.asistencias = new AsistenciaModel();
   }

  ngOnInit(): void {
  }

}
