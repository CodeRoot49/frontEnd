import { AuthGuard } from './../../guards/auth.guard';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ReporteComponent } from './reporte/reporte.component';
import { UpdateEmpleadoComponent } from './update-empleado/update-empleado.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { HomeComponent } from './home.component';
import { IndexComponent } from './index/index.component';
import { Route} from '@angular/router';
import { Reportes15Component } from './reportes15/reportes15.component';

export const IndexRoutes: Route[] = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            {path: '', component: IndexComponent},
            {path: 'empleados', component: EmpleadosComponent},
            {path: 'empleado/:documento/:nombre', component: EmpleadoComponent},
            {path: 'actualizar/:documento/:nombre', component: UpdateEmpleadoComponent},
            {path: 'reportes', component: ReportesComponent},
            {path: 'reportes_quince', component: Reportes15Component},
            {path: 'reporte/:fecha', component: ReporteComponent},
            {path: 'asistencia', component: AsistenciaComponent}
        ]
    }
];
