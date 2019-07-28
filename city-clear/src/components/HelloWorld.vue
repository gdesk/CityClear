<template>
  <div class="hello">
    <b-container class="find-place">
      <input type="text" placeholder="Inserisci il luogo"/>
        <div class="text-center mt-4">
          <button class="btn btn-unique" dark> Cerca 
            <v-icon name="search"></v-icon>
          </button>
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
      margin-bottom: 1%;
      border: 1px solid #cfd9db;
      background-color: #ffffff;
      border-radius: 0.25em;
      color: black;
  }

  .btn {
    align-self: auto;
    width: 10%;
    height: 40px;
    border-radius: 0.9em;
  }

  .icon{
    
    height: 100%;
  }

</style>
