<template>
    <div>
        <b-container fluid class ="forum-container">
			<b-row order="1">
				<br> <br> <br> <h3>PUNTI CALDI DA RISOLVERE</h3>  <br> <br>
				<div class="flex-container">
					<div v-for="(point, index) in points" :key=point._id >
						<b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button pill block v-b-toggle="'accordion-' + index" variant="transparent">{{(point.title).toUpperCase()}}
                                <b-img v-bind="mainProps" left alt="Left image"></b-img>
                            </b-button>
                        </b-card-header>
                        <b-collapse :id="'accordion-' + index" accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                                <b-card-text><b>Description</b>: {{ point.description }}</b-card-text>
                                <b-card-text><b>Scritto da</b>: {{point.user}} </b-card-text>
                
                                <b-button v-b-modal="'modal-'+index" pill variant="success" style="float: right">Risolvi</b-button>
                                    <b-modal :id="'modal-'+index" title="Bootstrap-Vue">
                                        <p class="my-4">Hello from modal!</p>
                                    </b-modal>
                                <br><br>

                            </b-card-body>
                        </b-collapse>
                        </b-card>
                    </div>
				</div>			
			</b-row>
    </b-container>        
    </div>    
</template>

<script>
const axios = require("axios");
const BASE_PATH = sessionStorage.urlHost;
const POINTS_PATH = `${BASE_PATH}/allPoints`;

export default {
	name: 'Forum',
	data() {
		return{
            points:[],
            mainProps: { blank: false, width: 28, height: 28, class: 'm1', src:require("../assets/road.png") }
		}
    },
    mounted() {
		this.getPoints();
    },
	methods: {
		getPoints(){
            axios
                .put(POINTS_PATH)
                .then(response => {
					console.log("response:   "+JSON.stringify(response.data));
					this.points = response.data;
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
		padding: 2%;
	}

	
	@media (max-width: 800px) {
		.row {
			width: 100%;
			align-content: center;
		}
	}
    
</style>