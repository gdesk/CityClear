<template>
    <div class="analysis">
        <b-container fluid class ="analysis-container">
            <b-row order="1">
                <mdb-container>
                    <mdb-bar-chart :data="barChartData" :options="barChartOptions" :width="600" :height="300"></mdb-bar-chart>
                </mdb-container>
            </b-row>
            <br><br><br>
            <b-row order="2">
                <mdb-container>
                    <mdb-doughnut-chart :data="doughnutChartData" :options="doughnutChartOptions" :width="600" :height="300"></mdb-doughnut-chart>
                </mdb-container>
            </b-row>
            <br><br><br>
            <b-row order="3">
                <mdb-container>
                    <mdb-horizontal-bar-chart :data="horizontalBarChartData" :options="horizontalBarChartOptions" :width="600" :height="300"></mdb-horizontal-bar-chart>
                </mdb-container>
            </b-row>
        </b-container>
    </div>
</template>

<script>
  import { mdbBarChart, mdbContainer, mdbDoughnutChart, mdbHorizontalBarChart} from 'mdbvue';
  export default {
    name: 'Analysis',
    components: {
      mdbBarChart,
      mdbContainer,
      mdbDoughnutChart,
      mdbHorizontalBarChart
    },
    data() {
      return {
        barChartData: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
          }]
        },
        barChartOptions: {
          responsive: false,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              barPercentage: 1,
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }],
            yAxes: [{
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }]
          }
        },
        doughnutChartData: {
          labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
          datasets: [
            {
              data: [300, 50, 100, 40, 120],
              backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
              hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
            }
          ]
        },
        doughnutChartOptions: {
          responsive: false,
          maintainAspectRatio: false
        },
        horizontalBarChartData: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
          }]
        },
        horizontalBarChartOptions: {
          responsive: false,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              barPercentage: 1,
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              }
            }],
            yAxes: [{
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              }
            }],
          }
        }
      };
    }
  }
</script>

<style scoped lang="scss">
    @import 'node_modules/bootstrap/scss/bootstrap';
	@import 'node_modules/bootstrap-vue/src/index.scss';
    .row{
		width: 50%;
		height: auto;
		display: inline-table;
        background: #F4F4F4;
        border-radius: 2px;
	}
	@media (max-width: 800px) {
		.row {
			width: 100%;
			align-content: center;
		}
	}
</style>