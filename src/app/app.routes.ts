import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: "",
    loadComponent: () => import("./pages/car-list-page/car-list-page.component").then(c => c.CarListPageComponent)
}];
