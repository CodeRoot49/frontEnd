
import { AdminPassChange } from './../models/adminPass.mode';
import { LoginModel } from './../models/login.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  token: string;
  private urlAPI = '/access.inspection/rest/api/auth';
  //private urlApiTime = '/access.inspection/acces.api/';
  //guardar la session
  public isAuthenticated(): boolean {
    const userData = sessionStorage.getItem('data');
    if (userData && userData.length > 80) {
      return true;
    }
    return false;
  }
  //OBTENER DATOS DE LA SESSION
  public async getAdminDate() {
    const userData = atob(sessionStorage.getItem('data'));
    return JSON.parse(userData);
  }

  //Iniciar session
  public login(loginAdmin: LoginModel): any {
    const loginData = {
      ...loginAdmin,
    };
    return this.http.post(`${this.urlAPI}`, loginData);
  }

  //Eliminar session
  public logOutSession(token): any {
    sessionStorage.removeItem('data');
    sessionStorage.clear();
    return this.http.get(`${this.urlAPI}/${token}`);
  }
  // CAMBIAR CONTRASEÑA
  changePassword(adminPass: AdminPassChange, idx: number): any {
    const authData = {
      id: idx,
      ...adminPass,
    };
    return this.http.put(`${this.urlAPI}/p_change`, authData);
  }
  // CONFIRMAR USUARIO
  confirmServicePassword(pass: any, idx: number): any {
    const authData = {
      password: pass,
      id: idx,
    };
    return this.http.post(`${this.urlAPI}/confirm/pass`, authData);
  }
  // Obtener tiempo
  // //getTime(): any{
  //   return this.http.get(`${this.urlApiTime}Time`);
  // }
}
