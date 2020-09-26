import { NoPageComponent } from './no-page.component';
import { Route} from '@angular/router';

export const NoPageRoute: Route[] = [
    {path: '**', component: NoPageComponent}
];