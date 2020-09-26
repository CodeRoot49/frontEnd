import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private urlAPI = '/access.inspection/rest/api/r';
  constructor(private http: HttpClient) { }
  getAsistencia(documento: string, token: string): any{
    return this.http.get(
      `${this.urlAPI}/${token}/asistencia/${documento}`
    );
  }
  getAsistencias(fecha: string, token: string): any{
    return this.http.get(
      `${this.urlAPI}/${token}/asistencias/all?data=${fecha}`
    );
  }
  getReportes(fecha: string, token: string ): any{
    return this.http.get(
      `${this.urlAPI}/${token}/reportes/all/?fech=${fecha}`
    );
  }
  get15reportes(token, fecha): any{
    return this.http.get(
      `${this.urlAPI}/${token}/quincenal?fecha=${fecha}`
    );
  }
  get15ModalReportes(token, inicio, fin): any{
    return this.http.get(
      `${this.urlAPI}/${token}/quincenal/fechas/${inicio}/${fin}`
    );
  }
}
