<template>
    <div class="find-me">
        <input type="text" id="findPlace" class="input" placeholder="  Inserisci il luogo"/>
        <div class="text-center mt-4">
          <button class="btn btn-unique" dark> Cerca 
            <v-icon name="search"></v-icon>
          </button>
          <button class="btn btn-unique"> Trovami 
            <v-icon name="send"></v-icon>
          </button>
        </div>
    </div>
</template>

<script>
import { mdbBtn } from "mdbvue";
export default {
    name: 'find-me',
    component: {
      mdbBtn
    } 
}
</script>

<style scoped>
@media only screen and (max-width: 450px){
  .find-me{
  width: 400px;
    height: 200px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -200px;
  } 
  .input:focus + .find{
    top: 70%;
    position: absolute;
  }
}
@media only screen and (min-width: 450px){
  .find-me{
    width: 400px;
    height: 200px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -200px;
}
}



.input {
  margin-top: 10%;
  align-self: auto;
  width: 300px;
  height: 40px;
  border: 1px solid #cfd9db;
  background-color: #ffffff;
  border-radius: 0.25em;
  color: black;
}

.btn {
  align-self: auto;
  width: 36%;
  height: 40px;
  border-radius: 0.9em;
}

.icon{
  height: 100%;
}

</style>

