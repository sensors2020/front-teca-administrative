import { Component, OnInit, ViewChild } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { UsersService } from './../../shared/services/users.service';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  radioModel: string = 'd';
  mensaje = '';
  respuesta = { rangoLitro: 0, anio:'', consumos: [], usuarios: [] };

  listServicios = [];



  // mainChart
  public mainChartElements = 6;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Current'
    },
    {
      data: this.mainChartData2,
      label: 'Previous'
    },
    {
      data: this.mainChartData3,
      label: 'BEP'
    }
  ];
  /* tslint:disable:max-line-length */
  //public mainChartLabels: Array<any> = ['Dic 2019', 'Ene 2020', 'Feb 2020', 'Mar 2020', 'Abr 2020', 'May 2020'];
  public mainChartLabels: Array<any> = [];
  /* tslint:enable:max-line-length */
  
  rangoLitro = 1000000;
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value: any) {
            return value;
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(1000000 / 5),
          max: 1000000
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = 'line';


  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  ngOnInit(): void {
    /*
    for (let i = 0; i <= this.mainChartElements; i++) {
      this.mainChartData1.push(this.random(50, 200));
    }
	*/
	this.load();
  }

  constructor(public usersService: UsersService, private SpinnerService: NgxSpinnerService) { 
  }

	public load() {
	
		let request = {
			body: { token: localStorage.getItem('token'),  periodo: this.radioModel
				  }			
		};

 
	this.SpinnerService.show(); 
	this.usersService.rptDashBoardService(request).subscribe((res) => {
		console.log("rptDashBoardService")	
		console.log(res)	
      if (res.body.error == null) {
		console.log('Inicio rptDashBoardService');		  
		console.log(res.body.body);		  
		this.respuesta = res.body.body;
		this.rangoLitro = this.respuesta.rangoLitro;
		this.listServicios = res.body.body.consumos;
		console.log("this.respuesta");		  
		console.log(this.respuesta);		  

		let aqua = this.respuesta.consumos;	

/*
		for(let j=0;j<usersaqua.length;j++) {
			users[j]=usersaqua[j].users*100000;			
		}


			this.mainChartLabels = []
			this.mainChartData1 = [];
*/	
	
		for(let i=0;i<aqua.length;i++) {
			//labels[i]=aqua[i].mes;
			//consumes[i]=parseInt(aqua[i].litros);
			this.mainChartLabels.push(aqua[i].values);
			this.mainChartData1.push(parseInt(aqua[i].litros));
		}


  this.mainChartData = [
    {
      data: this.mainChartData1,
      label: 'Current'
    }
  ];

this.mainChartElements = 6;

this.mainChartOptions = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value: any) {
            return value;
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(this.rangoLitro / 5),
          max: this.rangoLitro
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };



	this.mainChartColours = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  
  this.mainChartLegend = false;
  this.mainChartType = 'line';
  

		//this.mainChartData1 = consumes;
		//this.mainChartLabels = labels;
		console.log("mainChartData1");
		console.log(this.mainChartData1);

		this.SpinnerService.hide(); 
      } else {
		console.log("Error rptAquaMonth")		  
		console.log(res.error);		  
		this.SpinnerService.hide(); 
	  }
	  
    }, error => ( this.mensaje = 'Ocurrió un error, volver a intentar' )
	)

	
	}


	public loadRpt(value) {
		console.log("Reporte:"+value);
		this.mainChartLabels = []
		this.mainChartData1 = [];
		this.radioModel = value;
		this.load();
	}

	public refresh() {
		//Values  d,m,a
		console.log("radioModel:"+this.radioModel);
	}


}
