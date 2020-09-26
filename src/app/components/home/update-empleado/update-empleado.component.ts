import { EmpleadoUpdate } from './../../../models/update.model';
import { EmpleadoModel } from './../../../models/empleado.model';
import { AuthService } from './../../../services/auth.service';
import { EmpleadoService } from './../../../services/empleado.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-empleado',
  templateUrl: './update-empleado.component.html',
  styles: [],
})
export class UpdateEmpleadoComponent implements OnInit {
  carga: boolean;
  // variable empleado

  empleado: any;
  nombre: string;
  apellido: string;
  departamento: string;
  municipio: string;
  documento: string;
  cargo: string;
  tipoDocumento: string;
  Nacimiento: string;
  direccion: string;
  correo: string;
  rh: string;
  id: string;
  telefono: string;

  // final variables empelado
  update: EmpleadoUpdate;
  parameter: string;
  token: string;
  cargar: boolean;
  parameterName: string;
  constructor(
    private auth: AuthService,
    private _empleados: EmpleadoService,
    private routerlink: ActivatedRoute,
    private router: Router
  ) {
    this.empleado = new EmpleadoModel();
    this.routerlink.params.subscribe((params) => {
      this.parameter = params['documento'];
      this.parameterName = params['nombre'];
    });
    this.auth.getAdminDate().then((response) => {
      this.token = response.token;
    });
  }

  ngOnInit(): void {
    this.getEmpleados();
    this.update = new EmpleadoUpdate();
  }

  getEmpleados(): any {
    this.carga = true;
    this._empleados.getEmpleado(this.parameter, this.token).subscribe(
      (respuesta) => {
        const re = respuesta.nombreCompleto.split(' ');
        this.nombre = `${re[0]} ${re[1]}`;
        this.apellido = `${re[2]} ${re[3]}`;
        this.departamento = respuesta.departamento;
        this.municipio = respuesta.municipio;
        this.cargo = respuesta.cargo;
        this.documento = respuesta.tipoDocumento;
        this.tipoDocumento = respuesta.tipoDocumento;
        this.Nacimiento = respuesta.fechaNacimiento;
        this.rh = respuesta.rh;
        this.direccion = respuesta.direccion;
        this.correo = respuesta.correo;
        this.telefono = respuesta.telefono;
        this.empleado = respuesta;
        const nombres = respuesta.nombreCompleto.split(' ');
        const nombreString = `${nombres[0] || ''}.${nombres[1] || ''}.${nombres[2] || ''}.${nombres[3] || ''}`;
        this.router.navigate(['/actualizar', this.parameter, nombreString]);
        this.carga = false;
        //update data empleado
        this.update.NDocumento = this.empleado.documento;
        this.update.nombres = this.nombre;
        this.update.apellidos = this.apellido;
        this.update.departamento = this.empleado.departamento;
        this.update.municipio = this.empleado.municipio;
        this.update.direccion = this.empleado.direccion;
        this.update.correo = this.empleado.correo;
        this.update.cargo = this.empleado.cargo;
        this.update.telefono = this.empleado.telefono;
        this.empleado = respuesta;
      },
      (err) => {
        this.router.navigate(['/NOT_FOUND', this.parameter, 'NOT_FOUND']);
      }
    );
    this.carga = false;
  }

  CapitalizarNombre(value): any {
    try {
      value.toLocaleLowerCase();
      this.update.nombres = this.capitalizador(value);
    } catch (error) {}
  }
  CapitalizarApellido(termino): any {
    try {
      termino.toLocaleLowerCase();
      this.update.apellidos = this.capitalizador(termino);
    } catch (error) {}
  }
  capitalizador(value: string): string {
    let nombres = value.split(' ');
    nombres = nombres.map((nombre) => {
      return nombre[0].toLocaleUpperCase() + nombre.substring(1);
    });
    return nombres.join(' ');
  }
  goBack(): any {
    history.back();
  }

  // METODO PUT UPDATE EMPLEADO
  onsubmit(form: NgForm): any {
    if (form.invalid) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Complete los campos',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    this.carga = true;
    this._empleados
      .upDateEmpleado(this.token, this.parameter, this.update)
      .subscribe(
        (response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/empleado', this.update.NDocumento, this.parameterName]);
        },
        err => {
          this.carga = false;
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }
}
