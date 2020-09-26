import { EmpleadoModel } from './../../../models/empleado.model';
import { EmpleadoService } from './../../../services/empleado.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styles: [
  ]
})
export class EmpleadoComponent implements OnInit {
  empleado: EmpleadoModel;
  routesPrivate: boolean;
  token: string;
  parameter: string;
  carga: boolean;
  file: any;
  id: number;
  foto: any;
  cargandoLoading: boolean;
  constructor(private auth: AuthService, private _empleados: EmpleadoService, private routerlink: ActivatedRoute, private router: Router) {
    this.empleado = new EmpleadoModel();
    this.carga = true;
    this.routerlink.params.subscribe(params => {
      this.parameter = params['documento'];
    });
    this.auth.getAdminDate().then( response => {
      this.token = response.token;
      this.id = response.idAdmin;
      if (response.rol === 'adminUser'){
        this.routesPrivate = true;
      }else{
        this.routesPrivate = false;
      }
    });
  }

  ngOnInit(): void {
    this.getEmpleado();
  }
  getEmpleado(): any{
    this.cargandoLoading = true;
    this._empleados.getEmpleado(this.parameter, this.token)
        .subscribe(async (resp) => {
          this.empleado = await resp;
          const nombres = resp.nombreCompleto.split(' ');
          const nombreString = `${nombres[0] || ''}.${nombres[1] || ''}.${nombres[2] || ''}.${nombres[3] || ''}`;
          this.router.navigate(['/empleado', this.parameter, nombreString]);
          this.cargandoLoading = false;
        }, err => {
          this.router.navigate(['NOT_FOUND', this.parameter]);
        });
    this.carga = false;
  }
  verImagen(foto: string, nombre: string, cargo: string): any{
    Swal.fire({
      title: `${nombre}`,
      text: `${cargo}`,
      imageUrl: `${foto}`,
      imageWidth: 600,
      confirmButtonText:'X',
      imageHeight: 450,
      imageAlt: `${nombre}`,
    });
  }
  editar(documento: string, nombre: string): any{
    this.carga = true;
    const nombres = nombre.split(' ');
    const nombreString = `${nombres[0] || ''}.${nombres[1] || ''}.${nombres[2] || ''}.${nombres[3] || ''}`;
    this.router.navigate(['/actualizar', documento, nombreString]);
    this.carga = false;
  }
  eliminar(documento): any{
    this.carga = true;
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
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: resp.message,
                showConfirmButton: false,
                timer: 1500,
              });
              this.router.navigate(['/empleados']);
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
    this.carga = false;
  }
  changeImg(documento): any{
    (async () => {
      const { value: file } = await Swal.fire({
        title: 'Selecione la imagen a cargar',
        input: 'file',
        inputAttributes: {
          'accept': 'image/*',
          'aria-label': 'Subir foto de perfil'
        }
      });
      if (file) {
        this.file = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          Swal.fire({
            imageUrl: `${e.target.result}`,
            showCancelButton: true,
            imageWidth: 500,
            imageHeight: 450,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cargar imagen'
          }).then((result) => {
            this.carga = true;
            if (result.value) {
              this.foto = e.target.result;
              this.empleado.foto = e.target.result.toString();
              this._empleados.updatePictureEmpleado(this.foto, documento, this.token)
                          .subscribe((response) => {
                            this.getEmpleado();
                            this.carga = false;
                            Swal.fire({
                              position: 'top-end',
                              icon: 'success',
                              title: 'Your work has been saved',
                              showConfirmButton: false,
                              timer: 1500
                            });
                          }, (err) => {
                            this.carga = false;
                            Swal.fire({
                              position: 'top-end',
                              icon: 'error',
                              title: 'No se pudo guardar la imagen',
                              text: `${err.error.message}`,
                              showConfirmButton: false,
                              timer: 1500
                            });
                          });
            }else{
              this.carga = false;
            }
          });
        };
        reader.readAsDataURL(this.file);
      }
    })();
  }
}
