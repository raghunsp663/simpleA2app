import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';

export const appRoutes: Routes = [
    { path: 'main', component: MainComponent },
    { path: 'search', component: SearchComponent },
    { path: '**', redirectTo: 'main' }
];

