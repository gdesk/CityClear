<template>
  <div class="hello">
    <b-container class="find-place">
      <input type="text" placeholder="Inserisci il luogo"/>
        <div class="text-center mt-4">
          <button class="btn btn-unique" dark> Cerca 
            <v-icon name="search"></v-icon>
          </button>
          &ensp;
          <button class="btn btn-unique"> Trovami 
            <v-icon name="send"></v-icon>
          </button>
        </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss">
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
    background-color: #ffffff;
    border-radius: 0.25em;
    color: black;
  }

  .btn {
    align-self: auto;
    width: 140px;
    height: 40px;
    border-radius: 0.9em;
    text-align: center;
  }

  .icon{
    width: 20px;
    height: 100%;
    text-align: center;
    vertical-align: middle;
  }

</style>
