var generationChart;

var setupChart = () => {
  var config = {
  	type: 'line',
  	data: {
  		labels: [],
  		datasets: [{
        backgroundColor: 'rgba(0, 0, 255)',
        borderColor: 'rgba(0, 0, 255)',
  			label: 'Mass Dataset',
  		  data: [],
  			fill: false,
  		 },
       {
         backgroundColor: 'rgba(255, 0, 255)',
         borderColor: 'rgba(255, 0, 255)',
  		   label: 'Sight Dataset',
  		   fill: false,
  			 data: [],
       },
        {
          backgroundColor: 'rgba(255, 0, 0)',
          borderColor: 'rgba(255, 0, 0)',
          label: 'Speed Dataset',
          fill: false,
          data: [],
        },
        {
          backgroundColor: 'rgba(0, 255, 0)',
          borderColor: 'rgba(0, 255, 0)',
          label: 'Population Dataset',
          fill: false,
          data: [],
         }]
  		},
  	options: {
  		responsive: true,
  		title: {
  			display: true,
  			text: 'Chart.js Line Chart'
  		},
  		tooltips: {
  			mode: 'index',
  			intersect: false,
  		},
  		hover: {
  			mode: 'nearest',
  		  intersect: true
  		},
  		scales: {
  			xAxes: [{
  				display: true,
  				scaleLabel: {
  					display: true,
  					labelString: 'Number of Generations'
  				}
  			}],
  			yAxes: [{
  				display: true,
  				scaleLabel: {
  					display: true,
  					labelString: 'Value'
  				}
  			}]
  		}
  	}
  };
  var ctx = document.getElementById('chart-holder').getContext('2d');
  generationChart = new Chart(ctx, config);
  return generationChart;
}

var updateChart = (label, massData, sightData, speedData, popData) => {
  generationChart.data.labels.push(label);
  generationChart.data.datasets[0].data.push(massData);
  generationChart.data.datasets[1].data.push(sightData);
  generationChart.data.datasets[2].data.push(speedData);
  generationChart.data.datasets[3].data.push(popData);
  generationChart.update();
}
