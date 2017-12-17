import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';

export const appRoutes: Routes = [
    // { path: 'login', component: LoginComponent },
    // {
    //     path: 'main', component: MainComponent,
    //     children: [
    //         {
    //             path: 'choose-chef', component: ChooseChefComponent
    //         },
    //         {
    //             path: 'main-content', component: MainContentComponent
    //         },
    //         {
    //             path: 'choose-dish', component: ChooseDishComponent
    //         },
    //         {
    //             path: 'cart', component: CartComponent
    //         }
    //     ]
    // },
    // { path: '**', redirectTo: 'login' }
    { path: 'main', component: MainComponent },
    { path: 'search', component: SearchComponent },
    { path: '**', redirectTo: 'main' }
];

