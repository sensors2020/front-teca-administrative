import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  templateUrl: 'widgets.component.html'
})
export class WidgetsComponent implements OnInit {
	@ViewChild('myModalAdd') public myModalAdd: ModalDirective;
	@ViewChild('myModalUpd') public myModalUpd: ModalDirective;
	titulo: any;
	estado = 1;
	currentPage = 1;
	page: number;
	servicios = [
	{id: 1,  description: 'Consumo de Agua'	},
	{id: 2, description: 'Botón de Pánico'	}	
	];
	listUsuarios = [
	{id: 1,  nombres: 'Marco Vega', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', estado: 1 },	
	{id: 2,  nombres: 'Marco Vega2', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', estado: 0 },	
	{id: 3,  nombres: 'Marco Vega3', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', estado: 1 },	
	{id: 4,  nombres: 'Marco Vega4', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', estado: 0 },	
	{id: 5,  nombres: 'Marco Vega5', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', estado: 1 },	
	{id: 6,  nombres: 'Marco Vega6', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', estado: 1},	
	{id: 7,  nombres: 'Marco Vega7', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', estado: 0 },
	{id: 8,  nombres: 'Marco Vega8', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', estado: 1},	
	{id: 9,  nombres: 'Marco Vega9', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', estado: 1},	
	{id: 10,  nombres: 'Marco Vega10', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', estado: 1},	
	{id: 11,  nombres: 'Marco Vega11', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', estado: 1},	
	{id: 12,  nombres: 'Marco Vega12', email: 'mvega@gmail.com', servicio: 'Consumo de Agua', estado: 1}	
	];


	departamentos2 = [
	{id: '14',  description: 'LIMA' }	
	];

	provincias2 = [
	{id: '01',  description: 'LIMA' }	
	];

	distritos2 = [
	{id: '01',  description: 'LIMA' },
	{id: '10',  description: 'LA MOLINA' },
	{id: '11',  description: 'LINCE' },
	{id: '22',  description: 'RIMAC' }
	];

	departamentos = [
	{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '01', distrito: 'Lima', ubigeo: '140101' },
	{ cod_departamento: '15', departamento: 'Loreto', cod_provincia: '01 ', provincia: 'Maynas', cod_distrito: '01', distrito: 'Iquitos', ubigeo: '150101' }
	];

	provincias = [
	{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '01 ', provincia: 'Lima', cod_distrito: '01', distrito: 'Lima', ubigeo: '140101' },
	{ cod_departamento: '14', departamento: 'Lima', cod_provincia: '03 ', provincia: 'Canta', cod_distrito: '01', distrito: 'Canta', ubigeo: '140301' }
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
	usuario = { nombres: '', apellidos:'', email:'', telefono:'', servicio: this.servicios[0], 
						 departamento: this.departamentos[0], provincia: this.provincias[0], distrito: this.distritos[0],
						dispositivo:'', tipoDocumento:'DNI', numeroDocumento:'', devices: [] };
	paginationNumber = 10;	
    contentArray = new Array(90).fill('');
    returnedArray: string[];
 
 
	constructor() {
		this.titulo = '';
		this.usuario = { nombres: '', apellidos:'', email:'', telefono:'', servicio: this.servicios[0], 
						 departamento: this.departamentos[0], provincia: this.provincias[0], distrito: this.distritos[0],
						dispositivo:'', tipoDocumento:'DNI', numeroDocumento:'', devices: [] };
		

	}

	ngOnInit() {
		if(this.listUsuarios.length > 0 ) {
			this.returnedUsuarios = this.listUsuarios.slice(0, this.paginationNumber);
			console.log("returnedUsuarios==========");
			console.log(this.returnedUsuarios );
		}
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
		this.titulo = 'Actualiza Datos de Usuarios';
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
