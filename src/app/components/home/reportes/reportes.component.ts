import { ReportesService } from './../../../services/reportes.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styles: [],
})
export class ReportesComponent implements OnInit {
  datas: any;
  botonDissabled: string;
  token: string;
  menssageError: string;
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
    this.fechaSearch('');
  }
  irReporte(fecha): any{
    this.router.navigateByUrl(`/reporte/${fecha}`);
  }

  fechaSearch(termino): any {
    if (termino.length > 5) {
      this.botonDissabled = '';
    }
    this.reporte.getReportes(termino, this.token).subscribe(
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
}
