<template>
  <div class="map-class" required>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>
     <div class="map">
      <div id=map-container></div>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
const axios = require("axios");
const BASE_PATH = "http://127.0.0.1:5051";
const ALL_POINTS_PATH = `${BASE_PATH}/allPoints`;
export default {
  name: "LeafletMap",
  data() {
    return {
      location: null,
      map: null,
      tileLayer: null,
      marker: null
    };
  },
  mounted() {
    this.initMap();
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    if(!this.location == null){
      this.addMarker();
    }
    this.addAllMarkers();
  },
  created() {
    if(this.$route.params.address != undefined){
      axios
        .post("http://www.mapquestapi.com/geocoding/v1/address?key=OeDlGkq72UToaVLbKavjUSdx2cUEXZui",
        {
          "location": this.$route.params.address,
          "options": {
             "thumbMaps": false
           }
        })
					.then(response => {
            const coords = response.data.results[0].locations[0].displayLatLng
            console.log(coords)
            this.location = { 
            lat: coords.lat,
            lng: coords.lng
          };
          });           
     
    }else if (navigator.geolocation) {
      navigator.geolocation.watchPosition(position => {
        if (this.location && this.location.lat === position.coords.latitude && this.location.lng === position.coords.longitude) {
          console.log("Same position");
        } else {
          this.location = { 
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        }
      }, function() {
        console.log('Geolocalization failed.');
      }, { 
        enableHighAccuracy: false,
        maximumAge: 1800000
      }
      );
    } else {
      alert("Geolocation not supported by this browser.");
    }
  },
  methods: {
    initMap() {
      this.map = L.map("map-container",  {
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: 'center',
        doubleClickZoom: 'center',
        touchZoom:       'center'
      });
   
      const point = this.location ? [this.location.lat, this.location.lng] : [44.1391000, 12.2431500];
      const zoom = this.location ? 5 : 15;
      this.map.setView(point, zoom);
    },
    addMarker() {
     this.marker = L.marker([this.location.lat, this.location.lng]).addTo(this.map)
      .bindPopup('Sei qui.');
    },
    addAllMarkers(){
      axios
						.put(ALL_POINTS_PATH)
						.then(response => {
            const data = response.data
            var msg;
              data.forEach(item => {
                if(window.location.href.includes("map")){
                  msg = ' <br> Per più dettagli, accedi.';
                }else if (window.location.href.includes("urban-decore-tag")){
                  msg = "<br>"+item.description + "<br> scritto da: "+item.user.split("@")[0] ;
                }
                L.marker([item.lat, item.lng]).addTo(this.map)
                .bindPopup("<b>"+item.title.toUpperCase()+"</b> "+ msg);
              });
						});
    }    
  },
   watch: {
    location: {
      handler() {
        if (this.marker == null) {
          this.addMarker();
        } else {
          this.marker.setLatLng([this.location.lat, this.location.lng]);
        }
        this.map.setView([this.location.lat, this.location.lng], 13);
      },
      deep: true
    }
   }
};
</script>

<style scoped>
  #map-container {
    width: 99vw;
    height: 90vh;
  }

  @media (max-width: 800px) {
    #map-container {
      width: 98vw;
      height: 89vh;
    }
  }

  @media (max-width: 500px) {
    #map-container {
      width: 95vw;
      height: 89vh;
  }
}
</style>
