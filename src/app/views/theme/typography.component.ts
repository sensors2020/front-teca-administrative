import { Component } from '@angular/core';

@Component({
  templateUrl: 'typography.component.html'
})
export class TypographyComponent {

  inicio: any;
  fin: any;
  periodo = 2020;
  periodos = [
	{anio: 2019,  description: '2019'	},
	{anio: 2020, description: '2020'	}	
  ];

  consumos = [
	{id: 1, mes: "Enero", consumo: '125', precio: "250.00"	},
	{id: 2, mes: "Febrero", consumo: '145', precio: "290.00"	},
	{id: 3, mes: "Marzo", consumo: '70', precio: "140.00"	}
  ];

  constructor() { 
   this.inicio = new Date().toISOString().split('T')[0];
   this.fin = new Date().toISOString().split('T')[0];
  }

}
