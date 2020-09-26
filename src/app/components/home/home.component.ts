import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {interval} from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  changepass: boolean;
  nombreAdmin: string;
  showPass: boolean;
  reloj: string;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const timer = interval(300);
    timer.subscribe(() => {
      this.getTime();
    }, err => {
      console.log('error : ', err);
    });

    this.changepass = false;
    this.auth.getAdminDate().then(data => {
      this.nombreAdmin = data.nombre;
    });
  }
  cambiar(event): any{
    this.cerrarVentanas();
  }
  nameMenu(): any{
    this.changepass = !this.changepass;
  }
  changePass(): any{
    this.showPass  = ! this.showPass;
  }
  cerrarVentanas(): any{
    this.changepass = !this.changepass;
    this.showPass  = ! this.showPass;
  }
  getTime(): any{
    const date = new Date();
    const hora = date.getHours();
    const minuto = date.getMinutes();
    const segundo = date.getSeconds();
    if (hora < 10 && minuto < 10 && segundo < 10){
      this.reloj = `0${hora} : 0${minuto} : 0${segundo}`;
    } else if (hora < 10 && minuto < 10 && segundo > 9){
      this.reloj = `0${hora} : 0${minuto} : ${segundo}`;
    } else if (hora < 10 && minuto > 9 && segundo > 9){
      this.reloj = `0${hora} : ${minuto} : ${segundo}`;
    }else  if (hora > 9 && minuto < 10 && segundo < 10){
      this.reloj = `${hora} : 0${minuto} : 0${segundo}`;
    }else  if (hora > 9 && minuto < 10 && segundo > 9){
      this.reloj = `${hora} : 0${minuto} : ${segundo}`;
    }else  if (hora > 9 && minuto > 9 && segundo < 10){
      this.reloj = `${hora} : ${minuto} : 0${segundo}`;
    }else  if (hora > 9 && minuto > 9 && segundo > 9){
      this.reloj = `${hora} : ${minuto} : ${segundo}`;
    }
  }
}
