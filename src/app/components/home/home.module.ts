import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexComponent } from './index/index.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ReporteComponent } from './reporte/reporte.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { UpdateEmpleadoComponent } from './update-empleado/update-empleado.component';
import { Reportes15Component } from './reportes15/reportes15.component';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';


//idioma

import {registerLocaleData} from '@angular/common';
import localEs_co from '@angular/common/locales/es';

//idioma function 
registerLocaleData(localEs_co);


@NgModule({
  declarations: [
                IndexComponent,
                EmpleadosComponent,
                EmpleadoComponent,
                ReportesComponent,
                ReporteComponent,
                AsistenciaComponent,
                UpdateEmpleadoComponent,
                Reportes15Component,
                LoadingComponent],
  imports: [
    CommonModule,
    FormsModule
  ], providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ]
})
export class HomeModule { }
