import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: [
  ]
})
export class NavComponent implements OnInit {
  adminType: boolean;
  token: string;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getAdminDate().then(data => {
      this.token = data.token;
      if (data.rol === 'adminUser'){
        this.adminType = true;
      }else{
        this.adminType = false;
      }
    });
  }
  closeSession(): any{
    this.auth.logOutSession(this.token).subscribe(
      resp => {
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          title: `Session terminada`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/login']);
      }, err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `${err.error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
        sessionStorage.removeItem('data');
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    );
  }

}
