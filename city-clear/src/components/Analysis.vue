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
                    <h2>Totale punti caldi in mappa: {{hotPoint}}</h2>
                </center>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import { mdbBarChart, mdbDoughnutChart} from 'mdbvue';
    const axios = require("axios");
    const BASE_PATH = sessionStorage.urlHost;
    const DISTRICT_PATH = `${BASE_PATH}/district`;
    const COUNT_MEMBER_PATH = `${BASE_PATH}/count/members`;
    const COUNT_TAG_PATH = `${BASE_PATH}/count/tags`;
    const COUNT_TAG_SPAZZATURA = `${BASE_PATH}/count/tag/spazzatura`;
    const COUNT_TAG_STORICO = `${BASE_PATH}/count/tag/storico`;
    const COUNT_TAG_STRADA = `${BASE_PATH}/count/tag/strada`;
    const COUNT_TAG_ALTRO = `${BASE_PATH}/count/tag/altro`;
    export default {
        name: 'Analysis',
        components: {
        mdbBarChart,
        mdbDoughnutChart
    },
    data() {
        return {
            area: "",
            province: "",
            district: "",
            cityPerson: "",
            countUser: 0,
            hotPoint: "",
            tagSpazzatura: "",
            tagStorico: "",
            tagStrada: "",
            tagAltro: "",
            barChartData: {
                labels: ["Spazzatura", "Strada dissestata", "Patrimonio", "Altro"],
                datasets: [{
                    data: [0, 0, 0, 0],
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
                    data: [0, 0],
                    backgroundColor: ["#F7464A", "#46BFBD"],
                    hoverBackgroundColor: ["#FF5A5E", "#5AD3D1"]
                    }
                ]
            },
            doughnutChartOptions: {
                responsive: false,
                maintainAspectRatio: false
            }
        };
    },
    mounted() {
        this.getDistrictInfo();
        this.countTags();
        this.countSpazzatura();
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
                .get(COUNT_MEMBER_PATH)
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
        },
        countTags() {
            axios
                .get(COUNT_TAG_PATH)
                .then(response => {
                    this.hotPoint = response.data
                })
        },
        countSpazzatura() {
            axios
                .get(COUNT_TAG_SPAZZATURA)
                .then(response => {
                    this.tagSpazzatura = response.data,
                    this.countStorico();
                })
        },
        countStorico() {
            axios
                .get(COUNT_TAG_STORICO)
                .then(response => {
                    this.tagStorico = response.data,
                            this.countStrada();
                })
        },
        countStrada() {
            axios
                .get(COUNT_TAG_STRADA)
                .then(response => {
                    this.tagStrada = response.data,
                    this.countAltro();
                })
        },
        countAltro() {
            axios
                .get(COUNT_TAG_ALTRO)
                .then(response => {
                    this.tagAltro = response.data,
                    this.barChartData = {
                        labels: ["Spazzatura", "Strada dissestata", "Patrimonio", "Altro"],
                        datasets: [{
                            data: [this.tagSpazzatura, this.tagStrada, this.tagStorico, this.tagAltro, 0],
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