import { ReporteModel } from './../../../models/reporte.model';
import { ReportesService } from './../../../services/reportes.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styles: [
  ]
})
export class ReporteComponent implements OnInit {
  getReport: ReporteModel;
  token: string;
  parameter: string;
  constructor(private router: Router, private auth: AuthService, private reporte: ReportesService, private routerlink: ActivatedRoute) {
    this.getReport = new ReporteModel();
    this.routerlink.params.subscribe(params => {
      this.parameter = params['fecha'];
    });
    this.auth.getAdminDate().then(data => {
      this.token = data.token;
      if (data.rol === 'adminUser'){
        this.router.navigate(['NOT_FOUND']);
      }
    });
   }

  ngOnInit(): void {
    this.getReporte();
  }
  getReporte(): any{
    this.reporte.getAsistencias(this.parameter, this.token).subscribe(resp => {
      this.getReport = resp;
    }, err => {
      this.router.navigate(['NOT_FOUND', this.parameter]);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `${err.error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }
  goBack(): any{
    history.back();
  }
  reportesExcel(json): any{
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.asistencias);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${json.fecha}.xlsx`);
  }
}
