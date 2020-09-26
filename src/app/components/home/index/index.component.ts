import { EmpleadoService } from './../../../services/empleado.service';

import { ReportesService } from './../../../services/reportes.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: [
  ]
})
export class IndexComponent implements OnInit {
  searchBoolean: boolean;
  adminType: boolean;
  buscarFecha: any;
  token: string;
  constructor(private router: Router, private empleado: EmpleadoService, private auth: AuthService, private reporte: ReportesService) {
  }

  ngOnInit(): void {
    this.buscarFecha = '';
    this.searchBoolean = false;
    this.auth.getAdminDate().then(data => {
      this.token = data.token;
      if (data.rol === 'adminUser'){
        this.adminType = true;
      }else{
        this.adminType = false;
      }
    });
  }
  empleados(): any{
    this.router.navigate(['/empleados']);
  }
  searchEmpleadoByDocument(): any{
    this.searchBoolean = !this.searchBoolean;
  }
  buscarFechaReporte(buscarFecha): any{
      this.reporte.getAsistencias(buscarFecha.value, this.token).subscribe(() => {
        this.router.navigate(['/reporte', buscarFecha.value]);

      }, err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `${err.error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }
  buscarempleado(termino): any{
    this.empleado.getEmpleado(termino, this.token)
                .subscribe(resp => {
                  this.router.navigate(['/empleado', resp.documento, resp.nombreCompleto]);
                }, err => {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: `${err.error.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                });
  }
  quince(): any{
    this.router.navigate(['reportes_quince']);
  }
}
