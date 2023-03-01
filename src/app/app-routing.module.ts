import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/components/unidades', pathMatch: 'full'},
  { path: 'components', loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
