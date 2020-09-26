import { ReportesService } from './../../../services/reportes.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-reportes15',
  templateUrl: './reportes15.component.html'
})
export class Reportes15Component implements OnInit {
  menssageError: string;
  datas: any;
  mostrarTable: boolean;
  datasReports: any;
  token: string;
  botonDissabled: string;
  constructor(
    private router: Router,
    private auth: AuthService,
    private reporte: ReportesService,
    private routerlink: ActivatedRoute
  ) {
    this.auth.getAdminDate().then((data) => {
      this.token = data.token;
      if (data.rol === 'adminUser') {
        this.router.navigate(['NOT_FOUND']);
      }
    });
    this.botonDissabled = 'disabled';
  }

  ngOnInit(): void {
    this.mostrarTable = false;
    this.fechaSearch('');
  }


  irReportes(inicio: string, fin: string): any {
    this.reporte.get15ModalReportes(this.token, inicio, fin)
    .subscribe(
      (resp) => {
        this.datasReports = resp;
        this.mostrarTable = true;
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
  }
  irReporte(fecha): any{
    this.router.navigateByUrl(`/reporte/${fecha}`);
  }
  fechaSearch(termino): any {
    if (termino.length > 5) {
      this.botonDissabled = '';
    }
    this.reporte.get15reportes(this.token, termino).subscribe(
      (resp) => {
        this.datas = resp;
      },
      (err) => {
        this.datas = null;
        this.menssageError = err.error.message;
      }
    );
  }
  todos(): any {
    this.fechaSearch('');
    this.menssageError = '';
    this.botonDissabled = 'disabled';
  }
  close(): any{
    this.mostrarTable = false;
  }


  donwload15(fechas): any{


    
    for(let fecha of fechas){
      this.reporte.getAsistencias(fecha.fecha, this.token).subscribe(resp => {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(resp.asistencias);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
    
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${resp.fecha}.xlsx`);
      }, err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `${err.error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
      console.log();
    }
  }
}
