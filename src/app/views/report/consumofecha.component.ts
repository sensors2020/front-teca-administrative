import {Component, OnInit} from '@angular/core';
import { UsersService } from './../../shared/services/users.service';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  templateUrl: 'consumofecha.component.html'
})
export class ConsumofechaComponent implements OnInit {

  inicio: any;
  fin: any;
  periodo = 2020;
  periodos = [
	{anio: 2019,  description: '2019'	},
	{anio: 2020, description: '2020'	}	
  ];
  mensaje = '';

	consumos = [
	{id: 1,  fecha: '01/02/2020 09:40:21', consumo:"2.1", precio: "21.00", estado: 1 },
	{id: 2,  fecha: '01/02/2020 14:24:14', consumo:"1.5", precio: "18.50", estado: 1 },
	{id: 3,  fecha: '02/02/2020 09:40:21', consumo:"2.0", precio: "20.00", estado: 1 },
	{id: 4,  fecha: '02/02/2020 09:40:21', consumo:"2.5", precio: "25.00", estado: 1 },
	{id: 5,  fecha: '03/02/2020 09:40:21', consumo:"1.8", precio: "19.70", estado: 1 },
	{id: 6,  fecha: '03/02/2020 09:40:21', consumo:"2.6", precio: "25.85", estado: 1 },
	{id: 7,  fecha: '03/02/2020 09:40:21', consumo:"2.6", precio: "25.85", estado: 1 },
	{id: 8,  fecha: '04/02/2020 09:40:21', consumo:"2.6", precio: "25.85", estado: 1 },
	{id: 9,  fecha: '04/02/2020 09:40:21', consumo:"2.6", precio: "25.85", estado: 1 },
	{id: 10,  fecha: '04/02/2020 09:40:21', consumo:"2.6", precio: "25.85", estado: 1 },
	{id: 11,  fecha: '05/02/2020 09:40:21', consumo:"2.6", precio: "25.85", estado: 1 },
	{id: 12,  fecha: '05/02/2020 09:40:21', consumo:"2.6", precio: "25.85", estado: 1 },
	{id: 13,  fecha: '05/02/2020 09:40:21', consumo:"2.6", precio: "25.85", estado: 1 },
	{id: 14,  fecha: '05/02/2020 09:40:21', consumo:"2.6", precio: "25.85", estado: 1 },
	{id: 15,  fecha: '06/02/2020 09:40:21', consumo:"2.6", precio: "25.85", estado: 1 },
	{id: 16,  fecha: '07/02/2020 09:40:21', consumo:"3.7", precio: "31.05", estado: 1 }
	]
	consumoTotal = 0.0;
	precioTotal = 0.0;
	
  constructor(public usersService: UsersService, private SpinnerService: NgxSpinnerService) { 
   this.inicio = new Date().toISOString().split('T')[0];
   this.fin = new Date().toISOString().split('T')[0];
   this.calculate();
  }


  public calculate() {
	console.log("Calculate");
	//this.consumos.forEach(function (value) {
	for (var value of this.consumos) {
		this.precioTotal = this.precioTotal + parseFloat(value.precio);
		this.consumoTotal = this.consumoTotal + parseFloat(value.consumo);
	}
	//this.precioTotal = (this.precioTotal).toFixed(2);
	//this.consumoTotal = this.consumoTotal.toFixed(2);
    	
	//this.precioTotal = Math.round(parseFloat(this.precioTotal)*100)/100; 
	//this.consumoTotal = Math.round(parseFloat(this.consumoTotal)*100)/100; 
	//}); 
	 
	this.precioTotal = Math.round(this.precioTotal); 
	this.consumoTotal = Math.round(this.consumoTotal); 
  }


	ngOnInit() {
		this.load();
	}

	public load() {

		let request = {
			body: { token: localStorage.getItem('token'),
					inicio: this.inicio,
					fin: this.fin,
				  }			
		};
	this.SpinnerService.show(); 
	this.usersService.rptAquaDate(request).subscribe((res) => {
		console.log("rptAquaDate")	
		console.log(res)	
      if (res.error == null) {
		console.log('Inicio rptAquaDate');		  
		console.log(res.body);		  
		this.consumos = res.body;
		this.SpinnerService.hide(); 
      } else {
		console.log("Error rptAquaDate")		  
		console.log(res.error);		  
		this.SpinnerService.hide(); 
	  }
	  
    }, error => ( this.mensaje = 'Ocurrió un error, volver a intentar' )
	)
	
	
	}

}
