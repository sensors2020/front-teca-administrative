import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsumomensualComponent } from './consumomensual.component';
import { ConsumofechaComponent } from './consumofecha.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reportes'
    },
    children: [
      {
        path: '',
        redirectTo: 'colors'
      },
      {
        path: 'consumomensual',
        component: ConsumomensualComponent,
        data: {
          title: 'Reporte de Consumo de Agua Mensual'
        }
      },
      {
        path: 'consumofecha',
        component: ConsumofechaComponent,
        data: {
          title: 'Reporte de Consumo de Agua por fecha'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {}
