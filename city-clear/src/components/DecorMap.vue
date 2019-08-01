<template>
  <div class="map" required>
    <div id="map-container"/>
  </div>  
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  name: "LeafletMap",
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.map = L.map("map-container").setView([44.139, 12.243], 5);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
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
