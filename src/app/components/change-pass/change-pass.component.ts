import { AuthService } from './../../services/auth.service';
import { AdminPassChange } from './../../models/adminPass.mode';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styles: [
  ]
})
export class ChangePassComponent implements OnInit {
  adminPass: AdminPassChange;
  id: number;
  @Output() cambio = new EventEmitter();
  constructor(private auth: AuthService) {
    this.auth.getAdminDate().then( response => {
      this.id = response.idAdmin;
    });
  }

  ngOnInit(): void {
    this.adminPass = new AdminPassChange();
  }
  changePass(form: NgForm): any{
    if (form.invalid){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Campos vacios',
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }
    this.auth.changePassword(this.adminPass, this.id)
              .subscribe(resp => {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: `${resp.message}`,
                  showConfirmButton: false,
                  timer: 3000,
                });
                this.cambio.emit(false);
              }, err => {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: err.error.message,
                showConfirmButton: false,
                timer: 3000,
              });
            });
  }
}
