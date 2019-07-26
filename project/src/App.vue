<template>
  <div id="app">
    <!-- Material form login -->
    <form>
      <div class="input">
        <mdb-input type="place" placeholder="Inserisci il luogo"/>
      </div>
      <div class="button">
        <mdb-btn>Cerca</mdb-btn>
        <mdb-btn>Trovami</mdb-btn>
      </div>
    </form>
  </div>
  <!-- Material form login -->
</template>

<script>
  import { mdbInput, mdbBtn } from 'mdbvue';
  export default {
    name: 'Basic',
    components: {
      mdbInput,
      mdbBtn
    },
  }
</script>

<style lang="scss">
:root {
  background: #008000;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 50%;
  padding: 5px;
  border: solid 1px #000000;
  outline: none;
  border-radius: 7px;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.05);
}
</style>
