import { EmpleadoUpdate } from './../models/update.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private urlAPI = '/access.inspection/rest/api/e';
  constructor(private http: HttpClient) {}

  getEmpleados(buscar: string, token: string): any {
    return this.http.get(
      `${this.urlAPI}/${token}/empleados?buscar=${buscar}`
    );
  }
  getEmpleado(documento: string, token: string): any {
    return this.http.get(
      `${this.urlAPI}/${token}/empleado/${documento}`
    );
  }
  upDateEmpleado(
    token: string,
    documento: string,
    update: EmpleadoUpdate
  ): any {
    const data = {
      ...update,
    };
    return this.http.put(
      `${this.urlAPI}/${token}/empleado/${documento}/update`,
      data
    );
  }
  updatePictureEmpleado(picture: any, documento: string, token: string): any {
    const update = {
      foto_update: picture,
    };
    return this.http.put(
      `${this.urlAPI}/${token}/empleado/${documento}/foto`,
      update
    );
  }
  deleteEmpleado(token: string, documento: string): any {
    return this.http.delete(
      `${this.urlAPI}/${token}/empleado/${documento}/delete`
    );
  }
}
