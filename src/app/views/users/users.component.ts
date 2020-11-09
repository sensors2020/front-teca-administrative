import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { UsersService } from './../../shared/services/users.service';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
	@ViewChild('myModalAddService') public myModalAddService: ModalDirective;
	@ViewChild('myModalAdd') public myModalAdd: ModalDirective;
	@ViewChild('myModalUpd') public myModalUpd: ModalDirective;
	@ViewChild('myModalAlert') public myModalAlert: ModalDirective;
	
    showLoader: boolean = true;
	titulo: any;
	estado = 1;
	currentPage = 1;
	page: number;
	servicios = [
	{id: 'AQUACONSUME',  description: 'Consumo de Agua'	},
	];
	planes = [
	{id: 'BASICO',  description: 'Plan Básico'	},
	{id: 'PLATINUM',  description: 'Plan Platinum'	},
	{id: 'PREMIUM',  description: 'Plan Premium'	}
	];
    messages = '';
    mensaje = '';

	listUsuarios = [];


	departamentos = [
	{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '01', distrito: 'Lima', ubigeo: '140101' }
	];

	provincias = [
	{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '01', distrito: 'Lima', ubigeo: '140101' }
	];

	distritos = [
	{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '01', distrito: 'Lima', ubigeo: '140101' },
	{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '04', distrito: 'Breña', ubigeo: '140104' },
	{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '06', distrito: 'Comas', ubigeo: '140106' },
	{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '08', distrito: 'Chorrillos', ubigeo: '140108' },
	{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '09', distrito: 'La Victoria', ubigeo: '140109' },
	{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '10', distrito: 'La Molina', ubigeo: '140110' },
	{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '11', distrito: 'Lince', ubigeo: '140111' }
	];

			
    returnedUsuarios = [];		
	usuario = { codigo: 0, nombre: '', apellido:'', email:'', telefono:'', servicio: this.servicios[0], ubicacion:'',
						 departamento: this.departamentos[0], provincia: this.provincias[0], distrito: this.distritos[0],
						 tarifa: '', alias: '',
						 dispositivo:'', tipodoc:'DNI', numdoc:'', devices: [], plan: this.planes[0],
						 inscripcion: '', finalizacion: '' };
	paginationNumber = 10;	
    contentArray = new Array(90).fill('');
    returnedArray: string[];

	
	constructor(public usersService: UsersService,
	private SpinnerService: NgxSpinnerService) {
		this.titulo = '';
		this.usuario = { codigo: 0, nombre: '', apellido:'', email:'', telefono:'', servicio: this.servicios[0], ubicacion:'',
						 departamento: this.departamentos[0], provincia: this.provincias[0], distrito: this.distritos[0],
						tarifa: '', alias: '',
						 dispositivo:'', tipodoc:'DNI', numdoc:'', devices: [], plan: this.planes[0],
						inscripcion: new Date().toISOString().split('T')[0],
						finalizacion: new Date().toISOString().split('T')[0]
						};
		
		//this.usuario.inscripcion = new Date().toISOString().split('T')[0];
		//this.usuario.finalizacion = new Date().toISOString().split('T')[0];



	}

	ngOnInit() {
		this.load();
	}
	
	public load() {
		this.usuario = { codigo: 0, nombre: '', apellido:'', email:'', telefono:'', servicio: this.servicios[0], ubicacion:'',
						departamento: this.departamentos[0], provincia: this.provincias[0], distrito: this.distritos[0],
						tarifa: '', alias: '',
						dispositivo:'', tipodoc:'DNI', numdoc:'', devices: [], plan: this.planes[0],
						inscripcion: new Date().toISOString().split('T')[0],
						finalizacion: new Date().toISOString().split('T')[0]
						};

		let request = {
			body: { token: localStorage.getItem('token') }			
		};
	this.SpinnerService.show();  
 
	this.usersService.listUsers(request).subscribe((res) => {
		console.log("listUsers")	
		console.log(res)	
      if (res.body.error == null) {
		console.log('Inicio listaUSer');		  
		console.log(res.body);		  
		this.listUsuarios = res.body;
        //this.router.navigate(['dashboard']);

		if(this.listUsuarios.length > 0 ) {
			this.returnedUsuarios = this.listUsuarios.slice(0, this.paginationNumber);
			console.log("returnedUsuarios==========");
			console.log(this.returnedUsuarios );
		}
		this.showLoader = false;
		this.SpinnerService.hide();  
      } else {
		console.log("Error listUsers")		  
		console.log(res.error);		  
		this.SpinnerService.hide();  
	  }
	  
    }, error => ( this.messages = 'Ocurrió un error, volver a intentar' )
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
  
	public edit(item) {
		console.log("Edit Item");
		console.log(item);
		this.titulo = 'Actualiza Datos de Usuarios';
		//this.usuario = item;
		this.usuario.nombre = item.nombre;
		this.usuario.apellido = item.apellido;
		this.usuario.email = item.email;
		this.usuario.telefono = item.telefono;
		this.usuario.tipodoc = item.tipodoc;
		this.usuario.numdoc = item.numdoc;
		this.myModalUpd.show();
	}
	public closeEdit() {
		this.myModalUpd.hide();
	}

	public close() {
		this.myModalAdd.hide();
	}
	public open() {
		this.titulo = 'Registro de Usuarios';
		this.myModalAdd.show();
	}
	
	public service(item) {
		console.log("service");
		console.log(item);
		this.usuario.codigo = item.codigo;
		this.titulo = 'Agregar Servicio';
		this.myModalAddService.show();
	}
	public closeService() {
		this.myModalAddService.hide();
	}
	public addService() {

		console.log('addService..');
		console.log(this.usuario);
		let bandera = 0;
		this.mensaje = '';
		if(this.usuario.dispositivo == '') {
			this.mensaje = 'Debe ingresar serie de dispositivo.'
			bandera = 1;
		} else if(this.usuario.servicio.id == '') {
			this.mensaje = 'Debe ingresar Servicio.'
			bandera = 1;
		}

		if(bandera == 1) {
			console.log("Mensaje:"+this.mensaje);
			this.myModalAlert.show();
		} else {


			let request = {
				body: {
					  token: localStorage.getItem('token'), 
					  codigo_usuario: this.usuario.codigo, 
					  codigo_servicio: this.usuario.servicio.id, 
					  description: this.usuario.servicio.description,
					  direccion: this.usuario.ubicacion,
					  ubigeo: this.usuario.distrito.ubigeo,
					  serie: this.usuario.dispositivo,
					  alias: this.usuario.alias,
					  tarifa: this.usuario.tarifa,
					  inscripcion:  this.usuario.inscripcion,
					  finalizacion:  this.usuario.finalizacion,
					  plan: this.usuario.plan.id

				}	
			};

			this.SpinnerService.show();  
			this.usersService.addService(request).subscribe((res) => {
			console.log("res.body");
			console.log(res.body);
			  if (res.body.error == null) {
				console.log("OK addService")		  
				this.mensaje = 'Operación realizada correctamente.';				
				this.closeService();	
				this.SpinnerService.hide();  
				this.myModalAlert.show();	
				this.load();
			  } else {
				console.log("Error addService")		  
				this.mensaje = 'Ocurrió un error, volver a intentar';		
				this.SpinnerService.hide();  
				this.myModalAlert.show();
			  }
			  
			}, error => ( this.mensaje = 'Ocurrió un error, volver a intentar' )
			)

			
		}



					  
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

	public closeAlert() {
		this.myModalAlert.hide();		
	}


	public statusUsuario(item) {
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
					 email: item.email
				}	
			};

			this.SpinnerService.show();  
			this.usersService.statusUser(request).subscribe((res) => {
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




	
	public addUsuario() {
		console.log('addUsuario..');
		console.log(this.usuario);
		let bandera = 0;
		this.mensaje = '';
		if(this.usuario.nombre == '') {
			this.mensaje = 'Debe ingresar nombre.'
			bandera = 1;
		} else if(this.usuario.email == '') {
			this.mensaje = 'Debe ingresar email.'
			bandera = 1;
		} else if(this.usuario.numdoc == '') {
			this.mensaje = 'Debe ingresar número de documento.'
			bandera = 1;
		} else if(this.usuario.devices.length <= 0) {
			this.mensaje = 'Debe ingresar al menos un dispositivo.'
			bandera = 1;
		}

		if(bandera == 1) {
			console.log("Mensaje:"+this.mensaje);
			this.myModalAlert.show();
		} else {

			console.log("this.usuario.devices");
			console.log(this.usuario.devices);
			let request = {
				body: {
					 nombre: this.usuario.nombre, 
					 apellido: this.usuario.apellido, 
					 email: this.usuario.email, 
					 tipodoc: this.usuario.tipodoc, 
					 numdoc: this.usuario.numdoc, 
					 telefono: this.usuario.telefono, 
					 usuario: this.usuario.email, 
					 password: this.usuario.numdoc,
					 devices: this.usuario.devices
				}	
			};

			this.SpinnerService.show();  
			this.usersService.addUser(request).subscribe((res) => {
			console.log("res.body");
			console.log(res.body);
			  if (res.body.error == null) {
				console.log("OK AddUser")		  
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

	}



	public updateUsuario() {
		console.log('updateUsuario..');
		console.log(this.usuario);
		let bandera = 0;
		this.mensaje = '';
		if(this.usuario.nombre == '') {
			this.mensaje = 'Debe ingresar nombre.'
			bandera = 1;
		} else if(this.usuario.apellido == '') {
			this.mensaje = 'Debe ingresar apellido.'
			bandera = 1;
		} else if(this.usuario.email == '') {
			this.mensaje = 'Debe ingresar email.'
			bandera = 1;
		} else if(this.usuario.telefono == '') {
			this.mensaje = 'Debe ingresar teléfono.'
			bandera = 1;
		} else if(this.usuario.numdoc == '') {
			this.mensaje = 'Debe ingresar número de documento.'
			bandera = 1;
		} else if(this.usuario.tipodoc == '') {
			this.mensaje = 'Debe ingresar tipo de documento.'
			bandera = 1;
		}

		if(bandera == 1) {
			console.log("Mensaje:"+this.mensaje);
			this.myModalAlert.show();
		} else {


			let request = {
				body: {
					 nombre: this.usuario.nombre, 
					 apellido: this.usuario.apellido, 
					 email: this.usuario.email, 
					 tipodoc: this.usuario.tipodoc, 
					 numdoc: this.usuario.numdoc, 
					 telefono: this.usuario.telefono, 
					 usuario: this.usuario.email, 
					 password: this.usuario.numdoc,
					 devices: this.usuario.devices
				}	
			};

			this.SpinnerService.show();  
			this.usersService.updateUser(request).subscribe((res) => {
				console.log(res)	
			  if (res.body.error == null) {
				console.log("OK AddUser")		  
				this.mensaje = 'Operación realizada correctamente.';				
				this.closeEdit();	
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

	}
	
	public addItem() {
		 console.log('AntDevices');
		 console.log(this.usuario);
		 let item = { codigo_servicio: this.usuario.servicio.id, description: this.usuario.servicio.description,
					  direccion: this.usuario.ubicacion,
					  ubigeo: this.usuario.distrito.ubigeo,
					  serie: this.usuario.dispositivo,
					  inscripcion:  this.usuario.inscripcion,
					  finalizacion:  this.usuario.finalizacion,					  
					  tarifa: this.usuario.tarifa,
					  alias: this.usuario.alias,
					  plan: this.usuario.plan.id
					  };
		 this.usuario.devices.push(item);
		 console.log('DesDevices');
		 console.log(this.usuario.devices);
		 this.usuario.dispositivo = '';
	}
	
	
	
	/*
    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
	*/



ubigeos = [
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '01', distrito: 'Lima', ubigeo: '140101' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '02', distrito: 'Ancon', ubigeo: '140102' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '03', distrito: 'Ate', ubigeo: '140103' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '04', distrito: 'Breña', ubigeo: '140104' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '05', distrito: 'Carabayllo', ubigeo: '140105' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '06', distrito: 'Comas', ubigeo: '140106' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '07', distrito: 'Chaclacayo', ubigeo: '140107' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '08', distrito: 'Chorrillos', ubigeo: '140108' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '09', distrito: 'La Victoria', ubigeo: '140109' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '10', distrito: 'La Molina', ubigeo: '140110' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '11', distrito: 'Lince', ubigeo: '140111' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '12', distrito: 'Lurigancho', ubigeo: '140112' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '13', distrito: 'Lurin', ubigeo: '140113' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '14', distrito: 'Magdalena del Mar', ubigeo: '140114' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '15', distrito: 'Miraflores', ubigeo: '140115' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '16', distrito: 'Pachacamac', ubigeo: '140116' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '17', distrito: 'Pueblo Libre', ubigeo: '140117' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '18', distrito: 'Pucusana', ubigeo: '140118' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '19', distrito: 'Puente Piedra', ubigeo: '140119' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '20', distrito: 'Punta Hermosa', ubigeo: '140120' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '21', distrito: 'Punta Negra', ubigeo: '140121' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '22', distrito: 'Rimac', ubigeo: '140122' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '23', distrito: 'San Bartolo', ubigeo: '140123' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '24', distrito: 'San Isidro', ubigeo: '140124' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '25', distrito: 'Barranco', ubigeo: '140125' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '26', distrito: 'San Martin de Porres', ubigeo: '140126' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '27', distrito: 'San Miguel', ubigeo: '140127' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '28', distrito: 'Santa Maria del Mar', ubigeo: '140128' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '29', distrito: 'Santa Rosa', ubigeo: '140129' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '30', distrito: 'Santiago de Surco', ubigeo: '140130' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '31', distrito: 'Surquillo', ubigeo: '140131' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '32', distrito: 'Villa Maria del Triunfo', ubigeo: '140132' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '33', distrito: 'Jesus Maria', ubigeo: '140133' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '34', distrito: 'Independencia', ubigeo: '140134' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '35', distrito: 'El Agustino', ubigeo: '140135' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '36', distrito: 'San Juan de Miraflores', ubigeo: '140136' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '37', distrito: 'San Juan de Lurigancho', ubigeo: '140137' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '38', distrito: 'San Luis', ubigeo: '140138' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '39', distrito: 'Cieneguilla', ubigeo: '140139' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '40', distrito: 'San Borja', ubigeo: '140140' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '41', distrito: 'Villa El Salvador', ubigeo: '140141' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '42', distrito: 'Los Olivos', ubigeo: '140142' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '43', distrito: 'Santa Anita', ubigeo: '140143' }
];

	
}
