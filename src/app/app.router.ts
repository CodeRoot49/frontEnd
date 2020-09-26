
import { NoPageRoute } from './components/no-page/no-page.router';
import { IndexRoutes } from './components/home/index.router';
import {Routes} from '@angular/router';
import { LoginRoute } from './components/login/login.route';


export const routes: Routes = [...LoginRoute, ...IndexRoutes, ...NoPageRoute];