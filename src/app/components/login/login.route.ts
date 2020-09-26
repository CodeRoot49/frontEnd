import { LoginGuard } from './../../guards/login.guard';
import { LoginComponent } from './login.component';
import { Route} from '@angular/router';

export const LoginRoute: Route[] = [
    {path: 'login', component: LoginComponent, canActivate: [LoginGuard]}
];