import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMiapiComponent } from './list-miapi/list-miapi.component';

const routes: Routes = [
  // Redirige a 'miapi/list' al visitar la ruta raíz
  { path: '', redirectTo: 'miapi/list', pathMatch: 'full' },
  // Ruta que muestra el componente ListMiapiComponent
  { path: 'miapi/list', component: ListMiapiComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiapiRoutingModule { }
