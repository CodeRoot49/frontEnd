
import { AuthService } from './../../services/auth.service';
import { LoginModel } from './../../models/login.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  login: LoginModel;
  carga: boolean;
  error: string;
  errorB: boolean;
  constructor(private auth: AuthService, private router: Router) {
  }
  ngOnInit(): void {
    this.login = new LoginModel();
    this.errorB = false;
  }
  postData(form: NgForm): any {
    if (form.invalid) {
      return;
    }

    this.carga = true;

    this.auth.login(this.login).subscribe(
      async (response) => {
        this.carga = false;
        sessionStorage.setItem('data', btoa(JSON.stringify(await response)));
        this.router.navigate(['']);
      },
      async (err) => {
        this.carga = false;
        this.error = await err.error.message;
        this.errorB = true;
        if (this.errorB) {
          setTimeout(() => {
            this.errorB = false;
          }, 20000);
          this.carga = false;
        }
      }
    );
  }
}
