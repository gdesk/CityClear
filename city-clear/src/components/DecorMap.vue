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
<script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"
  integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="
  crossorigin=""></script>
<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { isContext } from 'vm';
const axios = require("axios");
const BASE_PATH = sessionStorage.urlHost;
const ALL_POINTS_PATH = `${BASE_PATH}/allPoints`;
var trashIcon = new L.icon({
	iconUrl: require('../assets/trash.png'),
	iconSize: [35, 35],
  iconAnchor: [13, 27],
  popupAnchor:  [1, -24]
}); 
var roadIcon = new L.icon({
	iconUrl: require('../assets/road.png'),
	iconSize: [35, 35],
  iconAnchor: [13, 27],
  popupAnchor:  [1, -24]
}); 
var monumentIcon = new L.icon({
	iconUrl: require('../assets/monument.png'),
	iconSize: [35, 35],
  iconAnchor: [13, 27],
  popupAnchor:  [1, -24]
}); 
var otherIcon = new L.Icon({
  iconUrl: require('../assets/other.png'),
	iconSize: [35, 35],
  iconAnchor: [13, 27],
  popupAnchor:  [1, -24]
});
var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
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
        .post("https://www.mapquestapi.com/geocoding/v1/address?key=OeDlGkq72UToaVLbKavjUSdx2cUEXZui",
        {
          "location": this.$route.params.address,
          "options": {
             "thumbMaps": false
           }
        })
					.then(response => {
            const coords = response.data.results[0].locations[0].displayLatLng
            this.location = { 
            lat: coords.lat,
            lng: coords.lng
          };
          });           
     
    } else if (navigator.geolocation) {
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
     this.marker = L.marker([this.location.lat, this.location.lng], {icon: greenIcon}).addTo(this.map)
      .bindPopup('Sei qui.');
    },
    addAllMarkers(){
      axios
            .put(ALL_POINTS_PATH)
						.then(response => {
                  const data = response.data
                  var msg;
                  this.typeUser = window.sessionStorage.getItem("type");
                  data.forEach(item => {
                    if(window.location.href.includes("map")){
                      msg = ' <br> Per più dettagli, accedi.';
                    }else if (window.location.href.includes("urban-decore-tag")){
                      msg = "<br>"+item.description + "<br> scritto da: "+item.user.split("@")[0] ;
                    }
                    if(this.typeUser === "district") {
                          if (item.tag === "Strada dissestata"){
                                L.marker([item.lat, item.lng], {icon: roadIcon}).addTo(this.map)
                                .bindPopup("<b>"
                                        + item.title.toUpperCase() + "&nbsp; &nbsp;" 
                                        + "</b> "
                                        + msg);
                                }
                          else if (item.tag === "Spazzatura"){
                                L.marker([item.lat, item.lng], {icon: trashIcon}).addTo(this.map)
                                .bindPopup("<b>" 
                                        + item.title.toUpperCase() + "&nbsp; &nbsp;" 
                                        + "</b> "
                                        + msg);
                                }
                          else if (item.tag === "Patrimonio culturale o artistico"){
                              L.marker([item.lat, item.lng], {icon: monumentIcon}).addTo(this.map)
                              .bindPopup("<b>"
                                      + item.title.toUpperCase()  + "&nbsp; &nbsp;"
                                      + "</b> "
                                      + msg);
                          }
                          else {
                              L.marker([item.lat, item.lng], {icon: otherIcon}).addTo(this.map)
                              .bindPopup("<b>"
                                      + item.title.toUpperCase() + "&nbsp; &nbsp;"
                                      + "</b> "
                                      + msg);
                          }
                    } else {
                          if (item.tag === "Strada dissestata"){
                            L.marker([item.lat, item.lng], {icon: roadIcon}).addTo(this.map)
                            .bindPopup("<b>"+item.title.toUpperCase()+"</b> "+ msg);
                          }
                          else if (item.tag === "Spazzatura"){
                            L.marker([item.lat, item.lng], {icon: trashIcon}).addTo(this.map)
                            .bindPopup("<b>"+item.title.toUpperCase()+"</b> "+ msg);
                          }
                          else if (item.tag === "Patrimonio culturale o artistico"){
                            L.marker([item.lat, item.lng], {icon: monumentIcon}).addTo(this.map)
                            .bindPopup("<b>"+item.title.toUpperCase()+"</b> "+ msg);
                          }
                          else {
                            L.marker([item.lat, item.lng], {icon: otherIcon}).addTo(this.map)
                            .bindPopup("<b>"+item.title.toUpperCase()+"</b> "+ msg);
                          }
                    }
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
