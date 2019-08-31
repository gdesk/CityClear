<template>
    <div class="analysis">
        <h2> Comune di {{district}}</h2>
        <h4>Provincia: {{province}}, Regione: {{area}}</h4>
        <v-icon name="users"></v-icon> {{cityPerson}} <br><br>
        <b-container fluid class ="analysis-container">
           <b-row order="1">
                <center>
                    <mdb-bar-chart :data="barChartData" :options="barChartOptions" :width="auto" :height="300"></mdb-bar-chart>
                </center>
            </b-row>
            <b-row order="2">
                <center>
                    <mdb-doughnut-chart :data="doughnutChartData" :options="doughnutChartOptions" :width="auto" :height="300"></mdb-doughnut-chart>
                </center>
            </b-row>
           <b-row order="3">
                <center>
                    <mdb-horizontal-bar-chart :data="horizontalBarChartData" :options="barChartOptions" :width="auto" :height="300"></mdb-horizontal-bar-chart>
                </center>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import { mdbBarChart, mdbDoughnutChart, mdbHorizontalBarChart} from 'mdbvue';
    const axios = require("axios");
    const BASE_PATH = "http://127.0.0.1:5051";
    const USER_PATH = `${BASE_PATH}/users`;
	const DISTRICT_PATH = `${BASE_PATH}/district`;
    export default {
        name: 'Analysis',
        components: {
        mdbBarChart,
        mdbDoughnutChart,
        mdbHorizontalBarChart
    },
    data() {
        return {
            area: "",
            province: "",
            district: "",
            cityPerson: "",
            countUser: 0,
            barChartData: {
                labels: ["Spazzatura", "Strada dissestata", "Patrimonio", "Altro"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5],
                    backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
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
                labels: ["Utenti iscritti", "Persone non iscritte"],
                datasets: [
                    {
                    data: [this.countUser, (this.cityPerson -  this.countUser)],
                    backgroundColor: ["#F7464A", "#46BFBD"],
                    hoverBackgroundColor: ["#FF5A5E", "#5AD3D1"]
                    }
                ]
            },
            doughnutChartOptions: {
                responsive: false,
                maintainAspectRatio: false
            },
            horizontalBarChartData: {
                labels: ["Spazzatura", "Strada", "Patrimonio", "Altro"],
                datasets: [{
                    data: [12, 19, 3, 5],
                    backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1,
                }]
            }
        };
    },
    mounted() {
        this.getDistrictInfo();
    },
    methods: {
        getDistrictInfo() {
            axios
                .put(DISTRICT_PATH, {
                    user: window.sessionStorage.getItem("user")
                })
                .then(response => {
                    this.area = response.data.area,
                    this.province = response.data.province,
                    this.district = response.data.district,
                    this.cityPerson = response.data.cityPerson,
                    this.countMemers();
                })
        },
        countMemers() {
            axios
                .get(USER_PATH)
                .then(response => {
                    this.countUser = response.data,
                    this.doughnutChartData = {
                        labels: ["Utenti iscritti", "Persone non iscritte"],
                        datasets: [
                            {
                            data: [this.countUser, (this.cityPerson -  this.countUser)],
                            backgroundColor: ["#F7464A", "#46BFBD"],
                            hoverBackgroundColor: ["#FF5A5E", "#5AD3D1"]
                            }
                        ]
                    }
                })
        }
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
        border:1px solid black;
	}
    .icon{
		width: 20px;
		height: 100%;
		text-align: center;
	}
	@media (max-width: 800px) {
		.row {
			width: 100%;
			align-content: center;
		}
	}
</style>