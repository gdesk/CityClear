<template>
  <div class="find-me">
    <input  v-on:input="address = $event.target.value" type="text" placeholder="Inserisci il luogo"/>
      <div class="text-center mt-4">
        <b-button pill variant="success" :to=path  > Cerca 
          <v-icon name="search"></v-icon>
        </b-button>
        &ensp;
        <b-button pill variant="success" to="/map" > Trovami 
          <v-icon name="send"></v-icon>
        </b-button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'FindMe',
  data(){
    {
      return{
        address:""
      }
    }
  },
  computed: {
    path: function() {
        return '/map/ ' + this.address;
      }
  }
}
</script>

<style scoped lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';
  input {
    outline: 0;
    border: 0;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    margin-top: 10%;
    align-self: auto;
    width: 300px;
    height: 40px;
    margin-bottom: 20px;
    border: 1px solid #cfd9db;
    background-color: white;
    border-radius: 0.25em;
    color: black;
  }

  .btn {
    align-self: auto;
    width: 140px;
    height: 40px;
    text-align: center;
  }
  
  @media (max-width: 500px) {
    .find-me {
      margin-top: 50%;
    }
  }
	
	@media (max-width: 340px) {
    input {
      width: 250px;
    }

    .btn {
      width: 120px;
    }
  }

  .icon{
    width: 20px;
    height: 100%;
    text-align: center;
    vertical-align: middle;
  }

</style>