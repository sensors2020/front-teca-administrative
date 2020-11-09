import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { UsersService } from './../../shared/services/users.service';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  templateUrl: 'water.component.html'
})
export class WaterComponent implements OnInit {
	@ViewChild('myModalAdd') public myModalAdd: ModalDirective;
	@ViewChild('myModalAlert') public myModalAlert: ModalDirective;

	titulo: any;
	estado = 1;
    mensaje = '';
	currentPage = 1;
	page: number;
	servicios = [
	{id: 1,  description: 'Consumo de Agua'	},
	{id: 2, description: 'Botón de Pánico'	}	
	];
	listUsuarios = [];
	listUsuarios2 = [
	{id: 1,  nombres: 'Marco Vega', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', consumo:"132", serie:"CU032303", registro:"15/02/2019", estado: 1 },	
	{id: 2,  nombres: 'Marco Vega2', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', consumo:"132", serie:"CU032303", registro:"15/02/2019", estado: 0 },	
	{id: 3,  nombres: 'Marco Vega3', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', consumo:"132", serie:"CU032303", registro:"15/02/2019", estado: 1 },	
	{id: 4,  nombres: 'Marco Vega4', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', consumo:"132", serie:"CU032303", registro:"15/02/2019", estado: 0 },	
	{id: 5,  nombres: 'Marco Vega5', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', consumo:"132", serie:"CU032303", registro:"15/02/2019", estado: 1 },	
	{id: 6,  nombres: 'Marco Vega6', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', consumo:"132", serie:"CU032303", registro:"15/02/2019", estado: 1},	
	{id: 7,  nombres: 'Marco Vega7', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', consumo:"132", serie:"CU032303", registro:"15/02/2019", estado: 0 },
	{id: 8,  nombres: 'Marco Vega8', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', consumo:"132", serie:"CU032303", registro:"15/02/2019", estado: 1},	
	{id: 9,  nombres: 'Marco Vega9', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', consumo:"132", serie:"CU032303", registro:"15/02/2019", estado: 1},	
	{id: 10,  nombres: 'Marco Vega10', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', consumo:"132", serie:"CU032303", registro:"15/02/2019", estado: 1},	
	{id: 11,  nombres: 'Marco Vega11', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', consumo:"132", serie:"CU032303", registro:"15/02/2019", estado: 1},	
	{id: 12,  nombres: 'Marco Vega12', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', consumo:"132", serie:"CU032303", registro:"15/02/2019", estado: 1}	
	];
	historico = [];
	historico2 = [
	{id: 1,  fecha: '01/02/2020 09:40:21', consumo:"2.1", precio: "21.00", estado: 1 },
	{id: 2,  fecha: '01/02/2020 14:24:14', consumo:"1.5", precio: "18.50", estado: 1 },
	{id: 3,  fecha: '02/02/2020 09:40:21', consumo:"2.0", precio: "20.00", estado: 1 },
	{id: 4,  fecha: '02/02/2020 09:40:21', consumo:"2.5", precio: "25.00", estado: 1 },
	{id: 5,  fecha: '03/02/2020 09:40:21', consumo:"1.8", precio: "19.70", estado: 1 },
	{id: 6,  fecha: '03/02/2020 09:40:21', consumo:"2.6", precio: "25.85", estado: 1 },
/*	{id: 7,  fecha: '04/02/2020 09:40:21', consumo:"3.1", estado: 1 },
	{id: 8,  fecha: '04/02/2020 09:40:21', consumo:"3.7", estado: 1 },
	{id: 9,  fecha: '05/02/2020 09:40:21', consumo:"2.6", estado: 1 },
	{id: 10,  fecha: '05/02/2020 09:40:21', consumo:"2.9", estado: 1 },
	{id: 11,  fecha: '06/02/2020 09:40:21', consumo:"2.1", estado: 1 },
	{id: 12,  fecha: '06/02/2020 09:40:21', consumo:"1.2", estado: 1 },
	{id: 13,  fecha: '07/02/2020 09:40:21', consumo:"1.9", estado: 1 },
	{id: 14,  fecha: '07/02/2020 09:40:21', consumo:"1.5", estado: 1 },
	{id: 15,  fecha: '07/02/2020 09:40:21', consumo:"2.6", estado: 1 },
*/	{id: 16,  fecha: '07/02/2020 09:40:21', consumo:"3.7", precio: "31.05", estado: 1 },
	
	];	
    returnedUsuarios = [];		
	usuario = { nombres: '', apellidos:'', email:'', telefono:'', servicio:this.servicios[0], 
				dispositivo:'', tipoDocumento:'DNI', numeroDocumento:'', devices: [] };
	paginationNumber = 10;	
    contentArray = new Array(90).fill('');
    returnedArray: string[];
 
 	consumoTotal = 0.0;
	precioTotal = 0.00;
	iemdevice = {};
	
	statusService = 0;
	estados = [
	{ codigo: 0, descripcion: 'TODOS'},
	{ codigo: 1, descripcion: 'INICIADO'},
	{ codigo: 2, descripcion: 'CONECTADO'},
	{ codigo: 3, descripcion: 'SIN CONEXIÓN'},
	{ codigo: 4, descripcion: 'BATERIA BAJA'}
	];
	constructor(public usersService: UsersService, private SpinnerService: NgxSpinnerService) {
		this.titulo = '';
		this.usuario = { nombres: '', apellidos:'', email:'', telefono:'', servicio:this.servicios[0], 
						dispositivo:'', tipoDocumento:'DNI', numeroDocumento:'', devices: [] };
		
		this.calculate();
	}

  public search() {
	console.log("Estados:"+this.statusService);
	this.load();
  }
  public calculate() {
	console.log("Calculate");
	for (var value of this.historico) {
		this.precioTotal = this.precioTotal + parseFloat(value.precio);
		this.consumoTotal = this.consumoTotal + parseFloat(value.consumo);
	}
	//this.precioTotal = this.precioTotal.toFixed(2);
	//this.consumoTotal = this.consumoTotal.toFixed(2);
	//this.precioTotal = Math.round(this.precioTotal); 
	this.consumoTotal = Math.round(this.consumoTotal); 

  }

	ngOnInit() {
		this.load();
	}
	
	public load() {

		this.usuario = { nombres: '', apellidos:'', email:'', telefono:'', servicio:this.servicios[0], 
						dispositivo:'', tipoDocumento:'DNI', numeroDocumento:'', devices: [] };

		let request = {
			body: { token: localStorage.getItem('token'),
					estado: this.statusService }			
		};
 
	this.SpinnerService.show(); 
	this.usersService.listUsersServices(request).subscribe((res) => {
		console.log("listUsers")	
		console.log(res)	
      if (res.body.error == null) {
		console.log('Inicio listaUSer');		  
		console.log(res.body);		  
		this.listUsuarios = res.body;
        //this.router.navigate(['dashboard']);
		
		if(this.listUsuarios.length>0) {
			this.returnedUsuarios = this.listUsuarios.slice(0, this.paginationNumber);
			console.log("returnedUsuarios==========");
			console.log(this.returnedUsuarios );
		}
		this.SpinnerService.hide(); 

      } else {
		console.log("Error listUsers")		  
		console.log(res.body.error);		  
		this.SpinnerService.hide(); 
	  }
	  
    }, error => ( this.mensaje = 'Ocurrió un error, volver a intentar' )
	)
	
	
	}

	
	public pageChanged(event: PageChangedEvent) {
		console.log("event");
		console.log(event);
		this.page = event.page;
		const startItem = (event.page - 1) * event.itemsPerPage;
		const endItem = event.page * event.itemsPerPage;
		this.returnedUsuarios = this.listUsuarios.slice(startItem, endItem);
		this.returnedArray = this.contentArray.slice(startItem, endItem);
    }
  
	public close() {
		this.myModalAdd.hide();
	}
	
	public view(item) {
		this.titulo = 'Histórico de consumos';

		this.iemdevice = item;

		let request = {
			body: { token: localStorage.getItem('token'),
			serie: item.serie
			
			}			
		};
	this.SpinnerService.show(); 
	this.usersService.listTxServices(request).subscribe((res) => {
		console.log("listTxServices")	
		console.log(res)	
      if (res.body.error == null) {
		console.log('Inicio listaUSer');		  
		console.log(res.body);		  
		this.historico = res.body;
		this.SpinnerService.hide(); 
        this.myModalAdd.show();
      } else {
		console.log("Error listUsers")		  
		console.log(res.body.error);		  
		this.SpinnerService.hide(); 
	  }
	  
    }, error => ( this.mensaje = 'Ocurrió un error, volver a intentar' )
	)
	


	}

	public deleteService(item) {

		console.log("deleteService....")	
		let request = {
			body: { token: localStorage.getItem('token'),
			serie: item.serie
			}			
		};
	this.SpinnerService.show(); 
	this.usersService.deleteService(request).subscribe((res) => {
		console.log("deleteService===============")	
		console.log(res)	
      if (res.body.error == null) {
		console.log('Ok deleteService');		  
		this.mensaje = 'Operación realizada correctamente.';				
		this.close();
		this.SpinnerService.hide(); 		
		this.myModalAlert.show();	
		this.load();
      } else {
		console.log("Error deleteService")		  
		console.log(res.body.error);		  
		this.SpinnerService.hide(); 
	  }
	  
    }, error => ( this.mensaje = 'Ocurrió un error, volver a intentar' )
	)
	


	}




	public deleteItem(item) {
		console.log('deleteItem');
		console.log(item);
		for (let order of this.usuario.devices) {
			if (item.dispositivo === order.dispositivo) {
				this.usuario.devices.splice(this.usuario.devices.indexOf(order), 1);
				break;
			}
		}
		this.usuario.dispositivo = '';

	}

	public addItem() {
		 console.log('AntDevices');
		 console.log(this.usuario);
		 let item = { servicio: this.usuario.servicio.id, description: this.usuario.servicio.description,
					  dispositivo: this.usuario.dispositivo };
		 this.usuario.devices.push(item);
		 console.log('DesDevices');
		 console.log(this.usuario.devices);
		 this.usuario.dispositivo = '';
	}
	
	

	public statusServicio(item) {
		console.log('statusUsuario..');
		console.log(item);
		let statusNew = 0;
		if(item.estado == 0) {
			statusNew = 1;
		} else if(item.estado == 1) {
			statusNew = 0;
		}

		console.log('statusNew:::'+statusNew);

			let request = {
				body: {
					 token: localStorage.getItem('token'), 
					 estado: statusNew, 
					 serie: item.serie
				}	
			};

			this.SpinnerService.show(); 
	
			this.usersService.statusServicio(request).subscribe((res) => {
				console.log(res)	
			  if (res.error == null) {
				console.log("OK updateUser");	  
				this.mensaje = 'Operación realizada correctamente.';				
				this.close();
				this.SpinnerService.hide(); 		
				this.myModalAlert.show();	
				this.load();
			  } else {
				console.log("Error AddUser")		  
				this.mensaje = 'Ocurrió un error, volver a intentar';				
				this.SpinnerService.hide(); 
				this.myModalAlert.show();
			  }
			  
			}, error => ( this.mensaje = 'Ocurrió un error, volver a intentar' )
			)

	}

	
	public closeAlert() {
		this.myModalAlert.hide();		
	}


	
}
