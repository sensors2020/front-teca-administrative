import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { UsersService } from './../../shared/services/users.service';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  templateUrl: 'tarifas.component.html'
})
export class TarifasComponent implements OnInit {
	@ViewChild('myModal') public myModal: ModalDirective;
	@ViewChild('myModalAlert') public myModalAlert: ModalDirective;

	titulo: any;
	estado = 1;
	currentPage = 1;
	page: number;
	servicios = [
	{id: 1,  description: 'Consumo de Agua'	},
	{id: 2, description: 'Botón de Pánico'	}	
	];

ubigeos = [];
ubigeos2 = [
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '01', distrito: 'Lima', ubigeo: '140101' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '02', distrito: 'Ancon', ubigeo: '140102' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '03', distrito: 'Ate', ubigeo: '140103' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '04', distrito: 'Breña', ubigeo: '140104' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '05', distrito: 'Carabayllo', ubigeo: '140105' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '06', distrito: 'Comas', ubigeo: '140106' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '07', distrito: 'Chaclacayo', ubigeo: '140107' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '08', distrito: 'Chorrillos', ubigeo: '140108' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '09', distrito: 'La Victoria', ubigeo: '140109' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '10', distrito: 'La Molina', ubigeo: '140110' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '11', distrito: 'Lince', ubigeo: '140111' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '12', distrito: 'Lurigancho', ubigeo: '140112' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '13', distrito: 'Lurin', ubigeo: '140113' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '14', distrito: 'Magdalena del Mar', ubigeo: '140114' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '15', distrito: 'Miraflores', ubigeo: '140115' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '16', distrito: 'Pachacamac', ubigeo: '140116' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '17', distrito: 'Pueblo Libre', ubigeo: '140117' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '18', distrito: 'Pucusana', ubigeo: '140118' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '19', distrito: 'Puente Piedra', ubigeo: '140119' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '20', distrito: 'Punta Hermosa', ubigeo: '140120' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '21', distrito: 'Punta Negra', ubigeo: '140121' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '22', distrito: 'Rimac', ubigeo: '140122' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '23', distrito: 'San Bartolo', ubigeo: '140123' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '24', distrito: 'San Isidro', ubigeo: '140124' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '25', distrito: 'Barranco', ubigeo: '140125' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '26', distrito: 'San Martin de Porres', ubigeo: '140126' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '27', distrito: 'San Miguel', ubigeo: '140127' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '28', distrito: 'Santa Maria del Mar', ubigeo: '140128' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '29', distrito: 'Santa Rosa', ubigeo: '140129' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '30', distrito: 'Santiago de Surco', ubigeo: '140130' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '31', distrito: 'Surquillo', ubigeo: '140131' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '32', distrito: 'Villa Maria del Triunfo', ubigeo: '140132' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '33', distrito: 'Jesus Maria', ubigeo: '140133' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '34', distrito: 'Independencia', ubigeo: '140134' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '35', distrito: 'El Agustino', ubigeo: '140135' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '36', distrito: 'San Juan de Miraflores', ubigeo: '140136' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '37', distrito: 'San Juan de Lurigancho', ubigeo: '140137' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '38', distrito: 'San Luis', ubigeo: '140138' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '39', distrito: 'Cieneguilla', ubigeo: '140139' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '40', distrito: 'San Borja', ubigeo: '140140' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '41', distrito: 'Villa El Salvador', ubigeo: '140141' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '42', distrito: 'Los Olivos', ubigeo: '140142' },
{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', tarifa: '1.00', cod_distrito: '43', distrito: 'Santa Anita', ubigeo: '140143' }
];


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

			
    returnedUbigeos = [];		
	usuario = { departamento: this.departamentos[0], provincia: this.provincias[0], distrito: this.distritos[0],
						tarifa: '', ubigeo: '' };
	paginationNumber = 10;	
	mensaje = '';	
 
 
	constructor(public usersService: UsersService, private SpinnerService: NgxSpinnerService) {
		this.titulo = '';
		this.usuario = { departamento: this.departamentos[0], provincia: this.provincias[0], distrito: this.distritos[0],
						tarifa: '', ubigeo: '' };
		

	}

	ngOnInit() {
		this.load();
	}

	public load() {

		let request = {
			body: { token: localStorage.getItem('token'),
					cod_departamento: '14', cod_provincia:'01'
				  }			
		};
 
	this.SpinnerService.show(); 
	this.usersService.listDistritos(request).subscribe((res) => {
		console.log("listDistritos")	
		console.log(res)	
      if (res.error == null) {
		console.log('Inicio listDistritos');		  
		console.log(res.body);		  
		this.ubigeos = res.body;
        //this.router.navigate(['dashboard']);

		if(this.ubigeos.length > 0 ) {
			this.returnedUbigeos = this.ubigeos.slice(0, this.paginationNumber);
			console.log("returnedUbigeos==========");
			console.log(this.returnedUbigeos );
		}
		this.SpinnerService.hide(); 

      } else {
		console.log("Error listDistritos")		  
		console.log(res.error);		  
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
		this.returnedUbigeos = this.ubigeos.slice(startItem, endItem);
    }
  
	
	public edit(item) {
		console.log("Edit Tarifa");
		console.log(item);
		this.titulo = 'Actualiza tarifa de Zona';
		this.myModal.show();
		this.usuario.tarifa = item.tarifa;
		this.usuario.departamento = item.departamento;
		this.usuario.provincia = item.provincia;
		this.usuario.distrito = item.distrito;
		
		this.usuario.ubigeo = item.ubigeo;
		
	}
	
	public updateTarifa(item) {
		console.log('updateTarifa..');
		console.log(this.usuario);
		let bandera = 0;
		this.mensaje = '';
		if(this.usuario.tarifa == '') {
			this.mensaje = 'Debe ingresar tarifa.'
			bandera = 1;
		} /*else if(this.usuario.departamento == '') {
			this.mensaje = 'Debe ingresar departamento.'
			bandera = 1;
		} else if(this.usuario.provincia == '') {
			this.mensaje = 'Debe ingresar provincia.'
			bandera = 1;
		} else if(this.usuario.distrito == '') {
			this.mensaje = 'Debe ingresar distrito.'
			bandera = 1;
		} */

		if(bandera == 1) {
			console.log("Mensaje:"+this.mensaje);
			this.myModalAlert.show();
		} else {


			let request = {
				body: {
					 ubigeo: this.usuario.ubigeo, 
					 tarifa: this.usuario.tarifa, 
					 token: localStorage.getItem('token')
				}	
			};
			this.SpinnerService.show();  
			this.usersService.updateTarifa(request).subscribe((res) => {
				console.log(res)	
			  if (res.error == null) {
				console.log("OK updateTarifa")		  
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

	
	public closeEdit() {
		this.myModal.hide();
	}

	
	public closeAlert() {
		this.myModalAlert.hide();		
	}
	
	
}
