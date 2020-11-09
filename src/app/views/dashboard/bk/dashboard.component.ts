import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { UsersService } from './../../shared/services/users.service';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  mensaje = '';
  respuesta = { anio:'', consumos: [], usuarios: [] };


  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType = 'bar';
  public barChartLegend = true;

/*
  public barChartLabels: string[] = ['2014','2015', '2016', '2017', '2018', '2019', '2020'];
  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 65, 69, 21], label: 'Consumo de Agua'},
    {data: [22, 26, 34, 43, 51, 55, 67, 70], label: 'Número de Usuarios'}
  ];
*/

  public barChartLabels: string[] = [];
  public barChartData: any[] = [
    {data: [], label: 'Consumo de Agua'},
    {data: [], label: 'Número de Usuarios'} 
  ];


  // Pie
  //public pieChartLabels: string[] = ['Enero', 'Febrero', 'Marzo'];
  //public pieChartData: number[] = [300, 500, 100, 200];
  
  //public pieChartLabels: string[] = ['Enero', 'Febrero', 'Marzo','Abril'];
  //public pieChartData: number[] = [0, 0, 1, 2];
  public pieChartData = [];
  public pieChartLabels = [];
  public pieChartType = 'pie';

  public pieChartOptions = {
        responsive: true
  }

pieChartColors:any = [
    {
        backgroundColor: [
		'rgba(30, 169, 224, 0.8)',
        'rgba(15,125,10,0.9)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(20, 191, 14, 0.8)',
        'rgba(251, 161, 181, 0.9)',
        'rgba(132, 116, 106, 0.9)',
        'rgba(130, 19, 24, 0.8)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(80, 116, 36, 0.9)',
        'rgba(225,150,100,0.9)',
        'rgba(255, 102, 0, 0.9)'
        ]
    }
]


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(public usersService: UsersService, private SpinnerService: NgxSpinnerService) { 
  }


	ngOnInit() {
		this.load();
  	
	}

	public load() {
	
		let request = {
			body: { token: localStorage.getItem('token')
				  }			
		};
 
	this.SpinnerService.show(); 
	this.usersService.rptDashBoard(request).subscribe((res) => {
		console.log("rptDashBoard")	
		console.log(res)	
      if (res.error == null) {
		console.log('Inicio rptDashBoard');		  
		console.log(res.body);		  
		this.respuesta = res.body;
		console.log("this.respuesta");		  
		console.log(this.respuesta);		  

		let aqua = this.respuesta.consumos;	
		let usersaqua = this.respuesta.usuarios;	
		this.barChartLabels = [];
		this.barChartData = [];
		
		let users = [];
		let labels = [];
		let consumes = [];
		let datas = [];

		for(let j=0;j<usersaqua.length;j++) {
			users[j]=usersaqua[j].users;			
		}
		
		for(let i=0;i<aqua.length;i++) {
			this.barChartLabels[i]=aqua[i].mes;
			//this.doughnutChartLabels[i]=aqua[i].mes;
			labels[i]=aqua[i].mes;
			consumes[i]=parseInt(aqua[i].litros);
			
		}

		 this.pieChartLabels = labels;
		 this.pieChartData  = consumes;
		
		
		this.barChartLabels = labels;
		this.barChartData = [
		{ data: consumes, label: 'Consumo de Agua'},
		{ data: users, label: 'Número de Usuarios'}
		];

		this.SpinnerService.hide(); 
      } else {
		console.log("Error rptAquaMonth")		  
		console.log(res.error);		  
		this.SpinnerService.hide(); 
	  }
	  
    }, error => ( this.mensaje = 'Ocurrió un error, volver a intentar' )
	)

	
	}

  
}
