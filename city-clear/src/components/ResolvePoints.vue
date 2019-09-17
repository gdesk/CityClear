<template>
    <div class="alldisp">
        <b-container fluid class ="forum-container">
			<b-row order="1">
				<br> <br> <br> <h3>PUNTI CALDI DA RISOLVERE</h3>  <br> <br>
				<div class="flex-container">
					<div v-for="(point, index) in points" :key=point._id >
						<b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button pill block v-b-toggle="'accordion-' + index" variant="transparent">{{(point.title).toUpperCase()}}
                                <b-img v-if="point.tag=='Strada dissestata'"  v-bind="roadProps" left alt="Left image"></b-img>
								<b-img v-if="point.tag=='Spazzatura'"  v-bind="trashProps" left alt="Left image"></b-img>
								<b-img v-if="point.tag=='Patrimonio culturale o artistico'"  v-bind="monumentProps" left alt="Left image"></b-img>
								<b-img v-if="point.tag=='Altro'"  v-bind="otherProps" left alt="Left image"></b-img>
                            </b-button>
                        </b-card-header>
                        <b-collapse :id="'accordion-' + index" accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                                <b-card-text><b>Description</b>: {{ point.description }}</b-card-text>
                                <b-card-text><b>Scritto da</b>: {{point.user}} </b-card-text>
                
                                <b-button pill variant="success" style="float: right" @click="areSure(point._id)">Risolvi</b-button>
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
const RESOLVE_PATH = `${BASE_PATH}/resolvePoint`

export default {
	name: 'ResolvePoints',
	data() {
		return{
            points:[],
			roadProps: { blank: false, width: 28, height: 28, class: 'm1', src:require("../assets/road.png") },
			trashProps: { blank: false, width: 28, height: 28, class: 'm1', src:require("../assets/trash.png") },
			monumentProps: { blank: false, width: 28, height: 28, class: 'm1', src:require("../assets/monument.png") },
			otherProps: { blank: false, width: 28, height: 28, class: 'm1', src:require("../assets/other.png") }
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
		},
		resolvePoint(pointId){
			axios
				.put(RESOLVE_PATH, {
					id: pointId
				})
				.then(response =>{
					console.log("response:   "+JSON.stringify(response.data));
					this.getPoints()
			})
		},
		areSure(pointId){
			var result = confirm("Hai davvero risolto il problema?");
			
			if(result){
				this.resolvePoint(pointId);
			}

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