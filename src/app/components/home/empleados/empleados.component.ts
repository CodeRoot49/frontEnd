import { AsistenciaModel } from './../../../models/asistencia.model';
import { ReportesService } from './../../../services/reportes.service';
import { AuthService } from './../../../services/auth.service';
import { EmpleadoService } from './../../../services/empleado.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styles: [],
})
export class EmpleadosComponent implements OnInit {
  routesPrivate: boolean;
  empleados: any;
  asistencias: AsistenciaModel;
  modalAsistencia: boolean;
  menssageError: string;
  token: string;
  carga: boolean;
  id: number;
  constructor(
    private _empleados: EmpleadoService,
    private auth: AuthService,
    private router: Router,
    private reporte: ReportesService
  ) {
    this.auth.getAdminDate().then((response) => {
      this.token = response.token;
      this.id = response.idAdmin;
      if (response.rol === 'adminUser') {
        this.routesPrivate = true;
      } else {
        this.routesPrivate = false;
      }
      this.asistencias = new AsistenciaModel();
    });
  }

  ngOnInit(): void {
    this.carga = true;
    this.modalAsistencia = false;
    this.buscar('');
  }

  buscar(search: string): any {
    this._empleados.getEmpleados(search, this.token).subscribe(
      async (resp) => {
        this.menssageError = null;
        this.empleados = await resp;
        this.carga = false;
      },
      (err) => {
        this.empleados = null;
        this.menssageError = err.error.message;
        console.log(err.error.message);
      }
    );
  }
  verEmpleado(documento: string, nombre): any {
    const nombres = nombre.split(' ');
    const nombreString = `${nombres[0] || ''}.${nombres[1] || ''}.${
      nombres[2] || ''
    }.${nombres[3] || ''}`;
    this.router.navigate(['/empleado', documento, nombreString]);
  }

  asistencia(documento: string): any {
    this.modalAsistencia = true;
    this.carga = true;
    this.reporte.getAsistencia(documento, this.token).subscribe(
      async (resp) => {
        this.asistencias = await resp;
        this.carga = false;
        console.log(resp);
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }
  editar(documento: string, nombre: string): any {
    const nombres = nombre.split(' ');
    const nombreString = `${nombres[0] || ''}.${nombres[1] || ''}.${
      nombres[2] || ''
    }.${nombres[3] || ''}`;
    this.router.navigate(['/actualizar', documento, nombreString]);
  }
  eliminar(documento: string, nombreEmpleado): any {
    (async () => {
      const { value: password } = await Swal.fire({
        title: 'Enter your password',
        allowOutsideClick: false,
        input: 'password',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
          autocapitalize: 'off',
          autocorrect: 'off',
        },
      });
      this.auth.confirmServicePassword(password, this.id).subscribe(
        (response) => {
          this._empleados.deleteEmpleado(this.token, documento).subscribe(
            (resp) => {
              this.buscar('');
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: resp.message,
                showConfirmButton: false,
                timer: 1500,
              });
            },
            (err) => {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: `${err.error.message}`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          );
        },
        (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `${err.error.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
    })();
  }
}
