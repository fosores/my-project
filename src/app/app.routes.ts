import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/demo/demo-routing.module').then((m) => m.DemoRoutingModule),
  },
];
